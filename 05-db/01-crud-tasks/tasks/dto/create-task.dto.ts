import { PartialType, PickType } from "@nestjs/swagger";
import {Task} from './task.dto';

export class CreateTaskDto extends PartialType(
    PickType(Task, ["title", "description"] as const),
  ) {}
