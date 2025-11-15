from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="categories/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    AFRICAN_STYLES = [
        ('dashiki', 'Dashiki Style'),
        ('kaftan', 'Kaftan Style'), 
        ('agbada', 'Agbada Style'),
        ('boubou', 'Boubou Style'),
        ('kente', 'Kente Inspired'),
        ('ankara', 'Ankara Pattern'),
        ('mudcloth', 'Mudcloth Design'),
        ('traditional', 'Traditional African'),
        ('modern_african', 'Modern African Fusion'),
        ('crochet_traditional', 'Traditional Crochet'),
        ('crochet_modern', 'Modern Crochet'),
    ]
    
    SIZES = [
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', '2X Large'),
        ('XXXL', '3X Large'),
        ('custom', 'Custom Size'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    african_style = models.CharField(max_length=20, choices=AFRICAN_STYLES, blank=True)
    
    # Product details
    material = models.CharField(max_length=255, blank=True, help_text="e.g., Cotton, Wool, Silk blend")
    colors_available = models.JSONField(default=list, help_text="List of available colors")
    sizes_available = models.JSONField(default=list, help_text="List of available sizes")
    
    # Images
    primary_image = models.ImageField(upload_to="products/", blank=True, null=True)
    image_gallery = models.JSONField(default=list, help_text="Additional product images")
    
    # Inventory and status
    stock_quantity = models.PositiveIntegerField(default=0)
    is_custom_order = models.BooleanField(default=False, help_text="Made to order item")
    estimated_delivery_days = models.PositiveIntegerField(default=7, help_text="Days for delivery")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    # Cultural significance
    cultural_significance = models.TextField(blank=True, help_text="Cultural meaning or history")
    care_instructions = models.TextField(blank=True)
    
    # Meta
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def is_in_stock(self):
        return self.stock_quantity > 0 or self.is_custom_order


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    preferred_style = models.CharField(max_length=20, choices=Product.AFRICAN_STYLES, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('in_progress', 'In Progress'),
        ('ready', 'Ready for Pickup/Delivery'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    order_number = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Totals
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Shipping details
    shipping_address = models.TextField()
    shipping_city = models.CharField(max_length=100)
    shipping_country = models.CharField(max_length=100)
    shipping_postal_code = models.CharField(max_length=20)
    
    # Special instructions
    special_instructions = models.TextField(blank=True)
    estimated_completion_date = models.DateField(blank=True, null=True)
    
    # Meta
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order {self.order_number} - {self.customer}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            import uuid
            self.order_number = f"FC{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=10, blank=True)
    color = models.CharField(max_length=50, blank=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Custom order details
    custom_measurements = models.JSONField(default=dict, blank=True)
    custom_notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.title} x {self.quantity}"

    def save(self, *args, **kwargs):
        self.total_price = self.unit_price * self.quantity
        super().save(*args, **kwargs)
