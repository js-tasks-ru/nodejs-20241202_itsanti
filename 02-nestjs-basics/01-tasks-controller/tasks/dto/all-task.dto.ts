import { IsString, IsEnum, IsNotEmpty } from '@nestjs/class-validator';
import { TaskStatus } from '../task.model';

export class TaskDto {
  @IsString()     // Ensures `title` is a string
  @IsNotEmpty()   // Ensures `title` is not an empty string
  title: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
