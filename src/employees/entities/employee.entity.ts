import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Department } from './department.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'date' })
  hireDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  salary: number;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.employees, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ default: true })
  isActive: boolean;
}
