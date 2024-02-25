class StoreManagement:
    def __init__(self, store_name, address, phone_number):
        self.store_name = store_name
        self.address = address
        self.phone_number = phone_number
        self.inventory = []
        self.employees = []

    def add_product(self, product):
        self.inventory.append(product)

    def remove_product(self, product):
        self.inventory.remove(product)

    def add_employee(self, employee):
        self.employees.append(employee)

    def remove_employee(self, employee):
        self.employees.remove(employee)

    def find_product_by_name(self, name):
        for product in self.inventory:
            if product.name == name:
                return product
        return None

    def find_product_by_category(self, category):
        return [product for product in self.inventory if product.category == category]

    def get_inventory(self):
        return self.inventory

    def get_employees(self):
        return self.employees