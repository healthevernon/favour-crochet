from django.contrib import admin
from .models import Product, Category, Customer, Order, OrderItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "created_at")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "description")
    list_filter = ("is_active", "created_at")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "african_style", "price", "stock_quantity", "is_featured", "is_active", "created_at")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("category", "african_style", "is_featured", "is_active", "is_custom_order", "created_at")
    search_fields = ("title", "description", "material")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("title", "slug", "description", "category", "african_style")
        }),
        ("Pricing & Inventory", {
            "fields": ("price", "stock_quantity", "is_custom_order", "estimated_delivery_days")
        }),
        ("Product Details", {
            "fields": ("material", "colors_available", "sizes_available", "cultural_significance", "care_instructions")
        }),
        ("Images", {
            "fields": ("primary_image", "image_gallery")
        }),
        ("Status", {
            "fields": ("is_featured", "is_active")
        }),
        ("Meta", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        })
    )


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("user", "phone", "city", "country", "preferred_style", "created_at")
    list_filter = ("country", "preferred_style", "created_at")
    search_fields = ("user__first_name", "user__last_name", "user__email", "phone")
    readonly_fields = ("created_at",)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("total_price",)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_number", "customer", "status", "total_amount", "created_at")
    list_filter = ("status", "created_at", "shipping_country")
    search_fields = ("order_number", "customer__user__first_name", "customer__user__last_name")
    readonly_fields = ("order_number", "created_at", "updated_at")
    inlines = [OrderItemInline]
    fieldsets = (
        ("Order Information", {
            "fields": ("order_number", "customer", "status")
        }),
        ("Pricing", {
            "fields": ("subtotal", "tax_amount", "shipping_cost", "total_amount")
        }),
        ("Shipping", {
            "fields": ("shipping_address", "shipping_city", "shipping_country", "shipping_postal_code")
        }),
        ("Special Details", {
            "fields": ("special_instructions", "estimated_completion_date")
        }),
        ("Meta", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        })
    )
