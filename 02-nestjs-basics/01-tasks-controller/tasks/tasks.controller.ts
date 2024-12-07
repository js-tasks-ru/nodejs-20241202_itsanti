import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { TaskDto } from "./dto/all-task.dto";

const validator = new ValidationPipe({
  whitelist: true,            // Removes any properties not in the DTO
  forbidNonWhitelisted: true, // Throws an error if extra properties are present
});

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(validator)
  createTask(@Body() task: TaskDto) {
    return this.tasksService.createTask(task as Task);
  }

  @Patch(":id")
  @UsePipes(validator)
  updateTask(@Param("id") id: string, @Body() task: TaskDto) {
    return this.tasksService.updateTask(id, task as Task);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}
