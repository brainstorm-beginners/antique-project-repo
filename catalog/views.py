from django.core.handlers.wsgi import WSGIRequest
from django.db.models import Q
from django.shortcuts import get_object_or_404

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render
from .models import Category, Product


def main_page(request: WSGIRequest) -> render:
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


def product_page(request: WSGIRequest, product_slug: str, category_slug: str) -> render:
    product_url = get_object_or_404(Product, slug=product_slug)

    return render(request, 'productPage.html', {'product': product_url})


def products_page(request: WSGIRequest, category_slug: str) -> render:
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)

    paginator = Paginator(products, 8)
    page_number = request.GET.get('page', 1)

    try:
        page_obj = paginator.get_page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.get_page(1)
    except EmptyPage:
        page_obj = paginator.get_page(paginator.num_pages)

    no_results = products.count() == 0

    root_categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    return render(request, 'productsPage.html', {
        'products': page_obj.object_list,
        'root_categories': root_categories,
        'selected_category': category,
        'page_obj': page_obj,
        'no_results': no_results,
        'total_pages': paginator.num_pages
    })


def search_results(request: WSGIRequest) -> render:
    query = request.GET.get('q', '')
    categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    products = Product.objects.filter(
        Q(name__icontains=query) | Q(description__icontains=query)
    ).order_by('-created_at')

    paginator = Paginator(products, 8)
    page_number = request.GET.get('page', 1)

    try:
        page_obj = paginator.get_page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.get_page(1)
    except EmptyPage:
        page_obj = paginator.get_page(paginator.num_pages)

    no_results = products.count() == 0

    return render(request, 'searchResults.html', {
        'products': page_obj.object_list,
        'page_obj': page_obj,
        'total_pages': paginator.num_pages,
        'query': query,
        'no_results': no_results,
        'root_categories': categories
    })

