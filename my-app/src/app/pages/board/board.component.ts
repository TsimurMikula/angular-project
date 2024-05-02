import { Component, OnInit } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Task } from '../../core/models/tasks/task';
import { ButtonLogoutComponent } from '../../shared/components/buttons/logout/buttonLogout.component';
import { Store } from '@ngrx/store';
import * as TasksActions from "../../core/states/tasks.action"
import * as TasksSelectors from "../../core/states/tasks.selector"


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgFor, AsyncPipe, ButtonLogoutComponent],
  providers: [DataService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent implements OnInit {
  tasks: Task[]=[];
  currentTask: any;
       
  constructor(private store: Store<{ tasks: Task[] }>){}
     
  ngOnInit(){
    this.store.dispatch(TasksActions.loadTasks());
    this.store.select(TasksSelectors.selectAllTasks).subscribe({next:(data: Task[]) => this.tasks=data});
  }

  filterTasks(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  changeStatus(task:Task) {
    this.store.dispatch(TasksActions.updateTasks({task: task}));
  }

  onDragStart(task: Task) {
    this.currentTask = task;
  }

  onDrop(status: string) {
    const dropTask = this.tasks.find((task) => task.ticketId === this.currentTask.ticketId);
    if (dropTask) {
      const updateTask = {
        'ticketId': dropTask.ticketId,
        'status': status,
        'id': dropTask.id
      }
      this.changeStatus(updateTask)
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
  }
}
