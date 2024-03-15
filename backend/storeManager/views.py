from django.shortcuts import render
from .models import Employee, Product
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProductSerializer

def home(request):
    employees = Employee.objects.all()
    products = Product.objects.all()
    return render(request, 'home.html', {'employees': employees, 'products': products})


@api_view(['GET'])
def get_data(request):
    data = Product.objects.all()
    serializer = ProductSerializer(data, many=True)
    return Response(serializer.data)