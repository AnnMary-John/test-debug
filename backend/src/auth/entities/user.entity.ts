import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  PLATFORM_USER = 'platform_user',
  VENDOR = 'vendor',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PLATFORM_USER,
  })
  role: UserRole;

  @Column({ nullable: true })
  vendorId: string;
}
