from rest_framework import serializers
from .models import Product, Category, Customer, Order, OrderItem
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    products_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "image", "is_active", "products_count"]
    
    def get_products_count(self, obj):
        return obj.products.filter(is_active=True).count()


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    african_style_display = serializers.CharField(source='get_african_style_display', read_only=True)
    is_in_stock = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = [
            "id", "title", "slug", "price", "category", "category_name", 
            "african_style", "african_style_display", "primary_image", 
            "is_featured", "is_custom_order", "is_in_stock", "stock_quantity",
            "estimated_delivery_days"
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    african_style_display = serializers.CharField(source='get_african_style_display', read_only=True)
    is_in_stock = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]


class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Customer
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)
    product_image = serializers.CharField(source='product.primary_image', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = "__all__"


class CreateOrderSerializer(serializers.ModelSerializer):
    items = serializers.ListField(write_only=True)
    
    class Meta:
        model = Order
        fields = [
            "shipping_address", "shipping_city", "shipping_country", 
            "shipping_postal_code", "special_instructions", "items"
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        customer = self.context['request'].user.customer
        
        # Calculate totals
        subtotal = sum(item['unit_price'] * item['quantity'] for item in items_data)
        tax_amount = subtotal * 0.1  # 10% tax
        shipping_cost = 15.00  # Fixed shipping
        total_amount = subtotal + tax_amount + shipping_cost
        
        order = Order.objects.create(
            customer=customer,
            subtotal=subtotal,
            tax_amount=tax_amount,
            shipping_cost=shipping_cost,
            total_amount=total_amount,
            **validated_data
        )
        
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        return order


# Legacy serializer for backward compatibility
class ProductSerializer(ProductDetailSerializer):
    pass
