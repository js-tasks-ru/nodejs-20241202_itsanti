import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOneBy({id});
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Task[]> {
    const skip = (page-1) * limit;
    return this.taskRepository.find({
        skip,
        take: limit,
    });
  }

  async findOne(id: number):Promise<Task> {
    return await this.getTaskById(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.getTaskById(id);
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.getTaskById(id);
    await this.taskRepository.delete(id);
  }
}
