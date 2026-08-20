import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  findAll(search?: string, status?: TaskStatus) {
    const qb = this.repo.createQueryBuilder('task').orderBy('task.id', 'DESC');
    if (status) qb.andWhere('task.status = :status', { status });
    if (search?.trim()) qb.andWhere('LOWER(task.name) LIKE LOWER(:search)', { search: `%${search.trim()}%` });
    return qb.getMany();
  }

  async findOne(id: number) {
    const task = await this.repo.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  create(dto: CreateTaskDto) {
    return this.repo.save(this.repo.create({ ...dto, member: dto.member ?? 'K', status: dto.status ?? TaskStatus.TODO }));
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return this.repo.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    await this.repo.remove(task);
    return { message: 'Task deleted', id };
  }
}
