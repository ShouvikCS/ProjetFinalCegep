class Employee:
    def __init__(self, employee_id, first_name, last_name, position, salary):
        self.employee_id = employee_id
        self.first_name = first_name
        self.last_name = last_name
        self.position = position
        self.salary = salary

    def set_first_name(self, first_name):
        self.first_name = first_name

    def set_last_name(self, last_name):
        self.last_name = last_name

    def set_position(self, position):
        self.position = position

    def set_salary(self, salary):
        self.salary = salary

    def get_first_name(self):
        return self.first_name

    def get_last_name(self):
        return self.last_name

    def get_position(self):
        return self.position

    def get_salary(self):
        return self.salary


class ManagerEmployee(Employee):
    def add_product(self, product):
        # I will add this after
        pass

    def increase_stock(self, product):
        # add after
        pass