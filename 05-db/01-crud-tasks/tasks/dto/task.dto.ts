
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";


export class Task {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsBoolean()
    isCompleted: boolean;
  }
