import { IsNotEmpty } from 'class-validator';
import { EVENT_FROM } from 'src/enums/event_from.enum';

export class CreateQuestDto {
  id: number;

  @IsNotEmpty()
  event_from: EVENT_FROM;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  created_at: Date;

  updated_at: Date;
}
