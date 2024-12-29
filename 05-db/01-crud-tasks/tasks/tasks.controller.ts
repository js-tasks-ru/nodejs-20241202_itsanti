import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import {Task} from "./entities/task.entity";
import { CreateTaskDto, GetTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { QueryTaskDto } from "./dto/query-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() {page, limit}: QueryTaskDto): Promise<Task[]> {
    console.log(page, limit);
    return this.tasksService.findAll(page, limit);
  }

  @Get(":id")
  findOne(@Param() {id}: GetTaskDto): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  update(@Param() {id}: GetTaskDto, @Body() task: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @Delete(":id")
  remove(@Param() {id}: GetTaskDto) {
    return this.tasksService.remove(id);
  }
}
