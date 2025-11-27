from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.views import generic
from django.views.generic import ListView
from django.http import JsonResponse
from .models import Products, Category



class ProjectListView(ListView):
    queryset = Products.objects.all()
    context_object_name = 'products'
    paginate_by = 5
    template_name = 'main.html'



def login_required_decorator(func):
    return login_required(func, login_url='login_page')


@login_required_decorator
def logout_page(request):
    logout(request)
    return redirect("login_page")


def login_page(request):
    error = ""
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("main")
        else:
            error = "Foydalanuvchi topilmadi yoki parol noto‘g‘ri"

    return render(request, 'login.html', {'error': error})


@login_required_decorator
def home_page(request):
    products = Products.objects.all()
    categories = Category.objects.all()
    context = {
        'products': products,
        'categories': categories
    }
    return render(request, 'main.html', context)

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    template_name = "signup.html"
    success_url = reverse_lazy("login_page")

    def form_valid(self, form):
        return super().form_valid(form)


def product_detail(request, year, month, day, slug):
    product = get_object_or_404(Products, slug=slug, publish__year=year, publish__month=month, publish__day=day)
    feature_values = product.feature_values.all()
    context = {
        'product': product,
        'feature_values': feature_values,
    }
    return render(request, 'market/product_details.html', context)

