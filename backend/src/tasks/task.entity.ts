import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  TODO = 'To Do',
  DOING = 'Doing',
  COMPLETED = 'Completed',
}

export enum TaskPriority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 160 })
  name!: string;

  @Column({ type: 'text', default: TaskPriority.MEDIUM })
  priority!: TaskPriority;

  @Column({ length: 80, default: 'K' })
  member!: string;

  @Column({ length: 40 })
  dueDate!: string;

  @Column({ type: 'text', default: TaskStatus.TODO })
  status!: TaskStatus;
}
