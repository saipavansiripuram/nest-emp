import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { Employee } from './entities/employee.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async onModuleInit() {
    const deptCount = await this.departmentRepository.count();
    if (deptCount === 0) {
      await this.seedDepartments();
      await this.seedEmployees();
    }
  }

  private async seedDepartments() {
    const departments = [
      { name: 'Engineering', location: 'Building A' },
      { name: 'Marketing', location: 'Building B' },
      { name: 'HR', location: 'Building C' },
      { name: 'Sales', location: 'Building D' },
    ];

    for (const dept of departments) {
      await this.departmentRepository.save(dept);
    }
  }

  private async seedEmployees() {
    const employees = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
        hireDate: new Date('2020-01-15'),
        salary: 75000,
        departmentId: 1,
      },
      // Add more employees...
    ];

    for (const emp of employees) {
      await this.employeeRepository.save(emp);
    }
  }
}
