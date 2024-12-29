import { PartialType, PickType } from "@nestjs/swagger";
import {Task} from './task.dto';

export class UpdateTaskDto extends PartialType(
    PickType(Task, ["title", "description", "isCompleted"] as const),
  ) {}
