import { Controller, Get, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { QueryTaskDto } from "./dto/query-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  getTasks(@Query() query: QueryTaskDto) {
    const {status, page, limit} = query;
    return this.tasksService.getFilteredTasks(status, page, limit);
  }
}
