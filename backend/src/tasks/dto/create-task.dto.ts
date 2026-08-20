import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskPriority, TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name!: string;

  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  member?: string;

  @IsDateString()
  dueDate!: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
