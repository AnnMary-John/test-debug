import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ComplianceIssue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  severity: 'high' | 'medium' | 'low';

  @Column()
  dateReported: string;

  @Column({ nullable: true })
  vendorId: string;
}

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  companyName: string;

  @Column()
  businessAddress: string;

  @Column()
  contactPhone: string;

  @Column()
  totalDrivers: number;

  @Column()
  totalCars: number;

  @Column()
  complianceStatus: 'compliant' | 'non-compliant' | 'pending';

  @Column({ type: 'json', nullable: true })
  complianceIssues: any[];

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
