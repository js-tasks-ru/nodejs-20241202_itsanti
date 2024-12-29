import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import {Task} from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
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
  findAll(@Query() query: QueryTaskDto): Promise<Task[]> {
    const {page, limit} = query;
    console.log(page, limit);
    return this.tasksService.findAll(page, limit);
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() task: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.tasksService.remove(id);
  }
}
