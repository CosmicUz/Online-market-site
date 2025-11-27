from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.utils.text import slugify
from django.contrib.auth.models import User


class Currency(models.Model):
    currency = models.CharField(max_length=50)

    def __str__(self):
        return self.currency

class Category(models.Model):
    name = models.CharField(max_length=150)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'parent',)
        verbose_name_plural = "Categories"

    def __str__(self):
        full_path = [self.name]
        k = self.parent
        while k is not None:
            full_path.append(k.name)
            k = k.parent
        return ' / '.join(full_path[::-1])

class Feature(models.Model):
    name = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='features')

    def __str__(self):
        return f"{self.category} - {self.name}"

class Products(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    short_description = models.CharField(max_length=250)
    img = models.ImageField(upload_to='products/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class ProductFeatureValue(models.Model):
    product = models.ForeignKey(Products, related_name='feature_values', on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)
    value = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.product.title} - {self.feature.name}: {self.value}"

