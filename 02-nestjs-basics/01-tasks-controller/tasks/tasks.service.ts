import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private id: number = 1; 

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.filter(task => task.id === id).at(0);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  createTask(task: Task): Task {
    const newTask = {id: `${this.id++}`, ...task};
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    const updateTask = this.getTaskById(id);
    Object.assign(updateTask, {...update});
    return updateTask;
  }

  deleteTask(id: string): Task {
    const taskToDelete = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
    return taskToDelete;
  }
}
