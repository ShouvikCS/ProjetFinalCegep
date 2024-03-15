from rest_framework import serializers
from .models import Product, Employee, Command, CommandLine

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class CommandLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommandLine
        fields = '__all__'

class CommandSerializer(serializers.ModelSerializer):
    command_lines = CommandLineSerializer(many=True, read_only=True)

    class Meta:
        model = Command
        fields = '__all__'
