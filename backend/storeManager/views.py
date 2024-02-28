from django.shortcuts import render
from .models import Employee, Product

def home(request):
    employees = Employee.objects.all()
    products = Product.objects.all()
    return render(request, 'home.html', {'employees': employees, 'products': products})
