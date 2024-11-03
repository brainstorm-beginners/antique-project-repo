from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import get_object_or_404

from django.core.paginator import Paginator
from django.shortcuts import render
from .models import Category, Product
from django.http import HttpRequest


def main_page(request: HttpRequest) -> render:
    categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    products = Product.objects.order_by('-created_at')

    paginator = Paginator(products, 8)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    return render(request, 'mainPage.html', {
        'root_categories': categories,
        'products': page_obj.object_list,
        'page_obj': page_obj,
        'total_pages': paginator.num_pages,
    })


def product_page(request: WSGIRequest, product_slug: str) -> render:
    product_url = get_object_or_404(Product, slug=product_slug)

    return render(request, 'productPage.html', {'product': product_url})


def products_page(request: HttpRequest, category_slug: str) -> render:
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)

    paginator = Paginator(products, 8)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    root_categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    return render(request, 'productsPage.html', {
        'products': page_obj.object_list,
        'root_categories': root_categories,
        'selected_category': category,
        'page_obj': page_obj,
        'total_pages': paginator.num_pages
    })
