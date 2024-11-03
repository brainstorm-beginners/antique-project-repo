from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render, get_object_or_404
from .models import Product, Category


def main_page(request: WSGIRequest) -> render:
    categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')
    last_ten_products = Product.objects.order_by('-created_at')[:10]

    return render(request, 'mainPage.html', {'root_categories': categories, 'products': last_ten_products})

def product_page(request: WSGIRequest, product_slug: str, category_slug: str) -> render:
    product_url = get_object_or_404(Product, slug=product_slug)

    return render(request, 'productPage.html', {'product': product_url})


def products_page(request: WSGIRequest, category_slug: str) -> render:
    category = get_object_or_404(Category, slug=category_slug)  # Получаем категорию по slug
    products = Product.objects.filter(category=category)  # Получаем продукты, относящиеся к этой категории
    root_categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    return render(request, 'productsPage.html',
                  {'product': products, 'root_categories': root_categories, 'selected_category': category})
