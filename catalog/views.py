from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render, get_object_or_404
from .models import Product, Category


def main_page(request: WSGIRequest) -> render:
    categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    return render(request, 'mainPage.html', {'root_categories': categories})

def product_page(request: WSGIRequest, product_slug: str) -> render:
    product_url = get_object_or_404(Product, slug=product_slug)

    return render(request, 'productPage.html', {'product': product_url})
