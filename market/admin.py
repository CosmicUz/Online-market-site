from django.contrib import admin
from .models import Category, Products, Feature, ProductFeatureValue, Currency

class ProductFeatureValueInline(admin.TabularInline):
    model = ProductFeatureValue
    extra = 1 

class ProductsAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'status')
    inlines = [ProductFeatureValueInline]

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        return form

class FeatureAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    list_filter = ('parent',)

admin.site.register(Category, CategoryAdmin)
admin.site.register(Products, ProductsAdmin)
admin.site.register(Feature, FeatureAdmin)
admin.site.register(Currency)
