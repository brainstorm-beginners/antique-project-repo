"""
URL configuration for antiqueProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path
from catalog.views import product_page, main_page, products_page, search_results

from antiqueProject import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', main_page, name='home'),
    path('home/category/<slug:category_slug>/product/<slug:product_slug>/', product_page, name='product_page'),
    path('home/category/<slug:category_slug>/', products_page, name='products_page'),
    path('home/search/', search_results, name='search_results'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
