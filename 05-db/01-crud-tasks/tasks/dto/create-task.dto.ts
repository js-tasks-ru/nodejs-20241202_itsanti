import { PartialType, PickType } from "@nestjs/swagger";
import {Task} from './task.dto';
import { Transform, Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateTaskDto extends PartialType(
    PickType(Task, ["title", "description"] as const),
  ) {}

  export class GetTaskDto {
    @IsInt()
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    id: number
  }
