import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VendorApplication {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  businessName: string;

  @Column()
  numberOfCars: number;

  @Column()
  numberOfVehicles: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: 'NEW' })
  status: 'NEW' | 'done';

  @Column({ type: 'text', nullable: true })
  internalNotes?: string;
}
