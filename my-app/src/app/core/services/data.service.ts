import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get("assets/data.json").pipe(map((data:any)=>{
        let tasks = data["tasks"];
        return tasks.map(function(task: any): Task {
            return new Task(task.ticketId, task.status, task.id);
          });
    }));
  }
  
  updateTask(task: Task){
    return this.http.put("http://localhost:3000/tasks/"+task.id, task); 
  }
}
