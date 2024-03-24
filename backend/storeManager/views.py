from django.shortcuts import render
from .models import Employee, Product
from rest_framework import generics
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


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response["Access-Control-Allow-Methods"] = "POST"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
