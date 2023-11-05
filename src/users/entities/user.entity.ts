import { Exclude } from 'class-transformer';
import { Role } from 'src/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id', 'username', 'email', 'phone'])
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 500, nullable: false })
  display_name: string;

  @Column({ length: 20, unique: true, nullable: false })
  username: string;

  @Column({ length: 500, select: false, nullable: false })
  password: string;

  @Column({ length: 100, unique: true, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  first_name: string;

  @Column({ length: 100, nullable: false })
  last_name: string;

  @Column({ length: 10, unique: true, nullable: false })
  phone: string;

  @Column({ default: new Date() })
  updated_at: Date;

  @Column({ default: new Date() })
  created_at: Date;

  @Column()
  role: Role;

  @Column({ nullable: true })
  token?: string;

  @Column({ nullable: true })
  refresh_token?: string;
}
