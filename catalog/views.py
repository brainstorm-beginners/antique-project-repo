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


def contact_page(request):
    return render(request, 'contactPage.html')


def products_page(request: WSGIRequest, category_slug: str) -> render:
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)
    categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    sort = request.GET.get('sort')

    if sort == 'price_asc':
        products = products.order_by('price')
    elif sort == 'price_desc':
        products = products.order_by('-price')
    elif sort == 'date_new':
        products = products.order_by('-created_at')
    elif sort == 'date_old':
        products = products.order_by('created_at')

    return render(request, 'productsPage.html',
                  {'product': products, 'root_categories': categories, 'selected_category': category, 'sort': sort})
