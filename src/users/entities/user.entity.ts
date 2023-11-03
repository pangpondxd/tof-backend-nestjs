import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username', 'email', 'phone'])
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 500, select: false })
  password: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ length: 10, unique: true })
  phone: string;

  @Column({ default: new Date() })
  updated_at: Date;

  @Column({ default: new Date() })
  created_at: Date;
}
