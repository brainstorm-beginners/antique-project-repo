from django.db.models import Q
from django.http import HttpRequest
from django.shortcuts import get_object_or_404

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render
from .models import Category, Product


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


def product_page(request: HttpRequest, product_slug: str, category_slug: str) -> render:
    product_url = get_object_or_404(Product, slug=product_slug, category__slug=category_slug)

    return render(request, 'productPage.html', {'product': product_url})



def contact_page(request):
    return render(request, 'contactPage.html')


def products_page(request: HttpRequest, category_slug: str) -> render:
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)

    sort_options = {
        'price_asc': 'price',
        'price_desc': '-price',
        'date_new': '-created_at',
        'date_old': 'created_at'
    }
    sort = request.GET.get('sort')
    products = products.order_by(sort_options.get(sort, '-created_at'))

    paginator = Paginator(products, 8)
    page_number = request.GET.get('page', 1)

    try:
        page_obj = paginator.get_page(page_number)
    except (PageNotAnInteger, EmptyPage):
        page_obj = paginator.get_page(1)

    no_results = not page_obj.object_list.exists()

    root_categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    return render(request, 'productsPage.html', {
        'products': page_obj.object_list,
        'root_categories': root_categories,
        'selected_category': category,
        'page_obj': page_obj,
        'no_results': no_results,
        'total_pages': paginator.num_pages,
        'sort': sort
    })


def search_results(request: HttpRequest) -> render:
    query = request.GET.get('q', '').strip()
    root_categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    if len(query) >= 2:
        products = Product.objects.filter(
            Q(name__iexact=query) | Q(name__icontains=query) | Q(description__icontains=query)
        ).order_by('-created_at')
    else:
        products = Product.objects.none()

    paginator = Paginator(products, 8)
    page_number = request.GET.get('page', 1)

    try:
        page_obj = paginator.get_page(page_number)
    except (PageNotAnInteger, EmptyPage):
        page_obj = paginator.get_page(1)

    no_results = not page_obj.object_list.exists()

    return render(request, 'searchResults.html', {
        'products': page_obj.object_list,
        'page_obj': page_obj,
        'total_pages': paginator.num_pages,
        'query': query,
        'no_results': no_results,
        'root_categories': root_categories
    })
