import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../models/tasks/tasks';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getData() : Observable<Task[]> {
    return this.http.get("assets/data.json").pipe(map((data:any)=>{
        let tasks = data["tasks"];
        return tasks.map(function(task: any): Task {
            return new Task(task.ticketId, task.status, task.id);
          });
    }));
  }
  
  updateData(task: Task){
    return this.http.patch("http://localhost:3000/tasks/" + task.id, task); 
  }
}
