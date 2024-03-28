from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductListView.as_view(), name='product-detail'),
    path('addproducts/', views.ProductCreateAPIView.as_view(), name='product-create'),
    path('updateproducts/<int:pk>/', views.ProductUpdateAPIView.as_view(), name='product-update'),
    path('deleteproducts/<int:pk>/', views.ProductDeleteAPIView.as_view(), name='product-delete'),
]

