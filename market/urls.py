from django.urls import path
from .views import *

urlpatterns = [
    path('', home_page, name='main'),
    path('login_page/',login_page, name='login_page'),
    path('logout_page/',logout_page, name='logout_page'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('product/<int:year>/<int:month>/<int:day>/<slug:slug>/', product_detail, name='product_details'),
]
