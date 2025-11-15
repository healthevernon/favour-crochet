from django.core.management.base import BaseCommand
from products.models import Category, Product
from decimal import Decimal


class Command(BaseCommand):
    help = 'Create sample data for Favour Crochet website'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample categories...')
        
        # Create Categories
        categories_data = [
            {
                'name': 'Traditional African Dresses',
                'description': 'Authentic African traditional dresses with rich cultural heritage and beautiful patterns.',
            },
            {
                'name': 'Modern Crochet',
                'description': 'Contemporary crochet designs that blend traditional techniques with modern fashion.',
            },
            {
                'name': 'Dashiki Collection',
                'description': 'Beautiful Dashiki-style clothing with vibrant African prints and comfortable fits.',
            },
            {
                'name': 'Ankara Styles',
                'description': 'Stunning Ankara fabric designs showcasing the beauty of African textile artistry.',
            },
            {
                'name': 'Custom Orders',
                'description': 'Personalized designs made to your exact specifications and measurements.',
            },
            {
                'name': 'Accessories',
                'description': 'Beautiful handmade accessories to complement your African-inspired wardrobe.',
            },
        ]

        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            if created:
                self.stdout.write(f'Created category: {category.name}')

        # Create Products
        traditional_cat = Category.objects.get(name='Traditional African Dresses')
        crochet_cat = Category.objects.get(name='Modern Crochet')
        dashiki_cat = Category.objects.get(name='Dashiki Collection')
        ankara_cat = Category.objects.get(name='Ankara Styles')
        custom_cat = Category.objects.get(name='Custom Orders')
        accessories_cat = Category.objects.get(name='Accessories')

        products_data = [
            # Traditional African Dresses
            {
                'title': 'Royal Blue Kente-Inspired Dress',
                'description': 'A stunning traditional dress featuring authentic Kente patterns in royal blue and gold. Perfect for special occasions and cultural celebrations.',
                'price': Decimal('25000.00'),
                'category': traditional_cat,
                'african_style': 'kente',
                'material': 'Premium Cotton Blend',
                'colors_available': ['Royal Blue', 'Gold', 'White'],
                'sizes_available': ['S', 'M', 'L', 'XL', 'XXL'],
                'stock_quantity': 8,
                'is_featured': True,
                'cultural_significance': 'Kente patterns traditionally represent African royalty and cultural pride.',
                'care_instructions': 'Hand wash in cold water. Air dry only. Iron on low heat.',
                # Add image path when you upload Facebook images
                # 'primary_image': 'products/kente-dress-1.jpg',
            },
            {
                'title': 'Elegant Mudcloth Maxi Dress',
                'description': 'Beautiful earth-toned maxi dress inspired by traditional Mudcloth patterns from Mali.',
                'price': Decimal('22000.00'),
                'category': traditional_cat,
                'african_style': 'mudcloth',
                'material': '100% Cotton',
                'colors_available': ['Earth Brown', 'Cream', 'Black'],
                'sizes_available': ['S', 'M', 'L', 'XL'],
                'stock_quantity': 12,
                'is_featured': True,
                'cultural_significance': 'Mudcloth patterns tell stories of African heritage and community.',
            },
            {
                'title': 'Vibrant Ankara Evening Dress',
                'description': 'Show-stopping evening dress in vibrant Ankara print perfect for celebrations.',
                'price': Decimal('30000.00'),
                'category': ankara_cat,
                'african_style': 'ankara',
                'material': 'Premium Ankara Fabric',
                'colors_available': ['Multi-color Print'],
                'sizes_available': ['S', 'M', 'L', 'XL', 'XXL'],
                'stock_quantity': 6,
                'is_featured': True,
            },
            
            # Crochet Items
            {
                'title': 'Handcrafted Crochet Cardigan',
                'description': 'Beautifully handcrafted crochet cardigan with intricate African-inspired patterns.',
                'price': Decimal('18000.00'),
                'category': crochet_cat,
                'african_style': 'crochet_modern',
                'material': 'Premium Wool Yarn',
                'colors_available': ['Cream', 'Burgundy', 'Forest Green'],
                'sizes_available': ['S', 'M', 'L', 'XL'],
                'stock_quantity': 10,
                'is_featured': False,
            },
            {
                'title': 'African Pattern Crochet Top',
                'description': 'Lightweight crochet top featuring geometric African patterns perfect for warm weather.',
                'price': Decimal('12000.00'),
                'category': crochet_cat,
                'african_style': 'crochet_traditional',
                'material': 'Cotton Crochet Thread',
                'colors_available': ['White', 'Beige', 'Light Blue'],
                'sizes_available': ['S', 'M', 'L'],
                'stock_quantity': 15,
            },
            
            # Dashiki Collection
            {
                'title': 'Classic Dashiki Shirt',
                'description': 'Authentic Dashiki shirt with traditional embroidered patterns.',
                'price': Decimal('15000.00'),
                'category': dashiki_cat,
                'african_style': 'dashiki',
                'material': 'Cotton Dashiki Fabric',
                'colors_available': ['Black', 'White', 'Red', 'Blue', 'Green'],
                'sizes_available': ['S', 'M', 'L', 'XL', 'XXL'],
                'stock_quantity': 20,
                'is_featured': True,
            },
            {
                'title': 'Women\'s Dashiki Dress',
                'description': 'Elegant women\'s Dashiki dress with beautiful embroidered neckline.',
                'price': Decimal('20000.00'),
                'category': dashiki_cat,
                'african_style': 'dashiki',
                'material': 'Premium Dashiki Cotton',
                'colors_available': ['Purple', 'Teal', 'Orange', 'Pink'],
                'sizes_available': ['S', 'M', 'L', 'XL'],
                'stock_quantity': 12,
            },
            
            # Custom Orders
            {
                'title': 'Custom Traditional Wedding Dress',
                'description': 'Bespoke traditional African wedding dress made to your exact specifications.',
                'price': Decimal('75000.00'),
                'category': custom_cat,
                'african_style': 'traditional',
                'material': 'Premium Fabrics (Customer Choice)',
                'colors_available': ['Custom'],
                'sizes_available': ['custom'],
                'stock_quantity': 0,
                'is_custom_order': True,
                'estimated_delivery_days': 21,
                'cultural_significance': 'Each piece is designed to honor your cultural heritage and personal story.',
            },
            {
                'title': 'Bespoke Agbada Set',
                'description': 'Custom-made traditional Agbada set with intricate embroidery and perfect fit.',
                'price': Decimal('85000.00'),
                'category': custom_cat,
                'african_style': 'agbada',
                'material': 'Premium Brocade Fabric',
                'colors_available': ['Custom'],
                'sizes_available': ['custom'],
                'stock_quantity': 0,
                'is_custom_order': True,
                'estimated_delivery_days': 28,
            },
            
            # Accessories
            {
                'title': 'Handwoven African Head Wrap',
                'description': 'Beautiful handwoven head wrap in traditional African patterns.',
                'price': Decimal('8000.00'),
                'category': accessories_cat,
                'african_style': 'traditional',
                'material': 'Cotton Blend',
                'colors_available': ['Multi-pattern'],
                'sizes_available': ['One Size'],
                'stock_quantity': 25,
            },
            {
                'title': 'Crochet Shoulder Bag',
                'description': 'Stylish crochet shoulder bag with African-inspired geometric patterns.',
                'price': Decimal('12000.00'),
                'category': accessories_cat,
                'african_style': 'crochet_modern',
                'material': 'Durable Cotton Thread',
                'colors_available': ['Natural', 'Brown', 'Black'],
                'sizes_available': ['Medium', 'Large'],
                'stock_quantity': 18,
            },
        ]

        self.stdout.write('Creating sample products...')
        
        for product_data in products_data:
            product, created = Product.objects.get_or_create(
                title=product_data['title'],
                defaults=product_data
            )
            if created:
                self.stdout.write(f'Created product: {product.title}')

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created sample data!\n'
                f'Categories: {Category.objects.count()}\n'
                f'Products: {Product.objects.count()}'
            )
        )