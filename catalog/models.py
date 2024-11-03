from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название товара")
    description = models.TextField(verbose_name="Описание товара")
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products', verbose_name="Категория товара")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена товара")
    slug = models.SlugField(unique=True, verbose_name="URL товара")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Товар: {self.name}(Описание: {self.description}, Категория: {self.category}, Цена: {self.price}, URL товара: {self.slug})"

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class ProductImage(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='images', verbose_name="Товар")
    image = models.ImageField(upload_to='products/', verbose_name="Изображение товара")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Фото для {self.product.name}"

    class Meta:
        verbose_name = "Фотография товара"
        verbose_name_plural = "Фотографии товара"


class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название категории")
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories',
        verbose_name="Родительская категория"
    )
    slug = models.SlugField(unique=True, verbose_name="URL категории")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def get_subcategories(self):
        return self.subcategories.all()
