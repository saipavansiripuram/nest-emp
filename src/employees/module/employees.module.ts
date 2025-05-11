import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../entities/employee.entity';
import { Department } from '../entities/department.entity';
import { DepartmentsController } from '../controllers/departments.controller';
import { DepartmentsService } from '../services/departments.service';
import { SeedService } from '../seed-data';
import { EmployeesController } from '../controllers/employees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department])],
  controllers: [EmployeesController, DepartmentsController],
  providers: [EmployeesService, DepartmentsService, SeedService],
})
export class EmployeesModule {}
