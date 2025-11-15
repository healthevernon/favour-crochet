from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from .models import Product, Category, Order, Customer
from .serializers import (
    ProductListSerializer, ProductDetailSerializer, CategorySerializer, 
    OrderSerializer, CreateOrderSerializer, CustomerSerializer
)
from .permissions import IsAdminOrReadOnly


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Public read-only access to categories"""
    queryset = Category.objects.filter(is_active=True).order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class ProductViewSet(viewsets.ModelViewSet):
    """Public read access; require ADMIN_API_KEY for create/update/delete."""
    queryset = Product.objects.filter(is_active=True).order_by("-created_at")
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'african_style', 'is_featured', 'is_custom_order']
    search_fields = ['title', 'description', 'material', 'cultural_significance']
    ordering_fields = ['created_at', 'price', 'title']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductDetailSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by African style
        style = self.request.query_params.get('style')
        if style:
            queryset = queryset.filter(african_style=style)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter by availability
        in_stock = self.request.query_params.get('in_stock')
        if in_stock == 'true':
            queryset = queryset.filter(
                Q(stock_quantity__gt=0) | Q(is_custom_order=True)
            )
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured products"""
        featured_products = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def african_styles(self, request):
        """Get available African styles"""
        styles = [{'value': choice[0], 'label': choice[1]} for choice in Product.AFRICAN_STYLES]
        return Response(styles)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get products grouped by category"""
        categories = Category.objects.filter(is_active=True)
        result = []
        
        for category in categories:
            products = self.get_queryset().filter(category=category)[:6]  # Limit to 6 per category
            category_data = {
                'category': CategorySerializer(category).data,
                'products': ProductListSerializer(products, many=True).data
            }
            result.append(category_data)
        
        return Response(result)


class CustomerViewSet(viewsets.ModelViewSet):
    """Customer management"""
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Customer.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    """Order management"""
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateOrderSerializer
        return OrderSerializer
    
    def get_queryset(self):
        if hasattr(self.request.user, 'customer'):
            return Order.objects.filter(customer=self.request.user.customer)
        return Order.objects.none()
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Update order status (admin only)"""
        order = self.get_object()
        new_status = request.data.get('status')
        
        if new_status in dict(Order.STATUS_CHOICES):
            order.status = new_status
            order.save()
            return Response({'status': 'Order status updated'})
        
        return Response(
            {'error': 'Invalid status'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
