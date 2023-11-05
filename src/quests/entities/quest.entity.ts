import { EVENT_FROM } from 'src/enums/event_from.enum';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class Quest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_from: EVENT_FROM;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
