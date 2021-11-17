import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}
  findAll(){
      this.taskRepo.find();
  }
  findOne(id:number){
    return this.taskRepo.findOne(id);
  }
  create(body:any){
    const newTask = this.taskRepo.create(body);
    return this.taskRepo.save(newTask);
    }

    async update(id:number, body:any){
        const task = await this.taskRepo.findOne(id);
        ///no performed forme
        ///task.completed = true;
        this.taskRepo.merge(task, body);
        return this.taskRepo.save(task);

    }

    async delete(id:number){
        await this.taskRepo.delete(id);
        return true;
        
    }


}
