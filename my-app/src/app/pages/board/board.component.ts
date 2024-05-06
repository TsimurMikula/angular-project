import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task';
import { ButtonLogoutComponent } from '../../shared/components/buttons/logout/buttonLogout.component';
import { Store } from '@ngrx/store';
import * as TasksActions from "../../core/states/tasks.action"
import * as TasksSelectors from "../../core/states/tasks.selector"
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ButtonLogoutComponent, CommonModule],
  providers: [DataService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy {
  private tasks: Task[]=[];
  private currentTask!: Task;
  private subscription!: Subscription;
  
  constructor(private store: Store<{ tasks: Task[] }>){}
     
  public ngOnInit(){
    this.store.dispatch(TasksActions.loadTasks());
    this.subscription = this.store.select(TasksSelectors.selectAllTasks).subscribe({next:(data: Task[]) => this.tasks=data});
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public filterTasks(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  private changeStatus(task:Task) {
    this.store.dispatch(TasksActions.updateTasks({task: task}));
  }

  public onDragStart(task: Task) {
    this.currentTask = task;
  }

  public onDrop(status: string) {
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

  public onDragOver(event: any) {
    event.preventDefault();
  }
}


