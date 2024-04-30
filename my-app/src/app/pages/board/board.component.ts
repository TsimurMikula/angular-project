import { Component, OnInit } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NgFor } from '@angular/common';
import { Task } from '../../core/models/tasks/tasks';
import { ButtonLogoutComponent } from '../../shared/components/buttons/logout/buttonLogout.component';




@Component({
  selector: 'app-board',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgFor, ButtonLogoutComponent],
  providers: [DataService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent implements OnInit {
  tasks: Task[]=[];
  currentTask: any;
       
  constructor(private DataService: DataService){}
     
  ngOnInit(){
      this.DataService.getData().subscribe({next:(data: Task[]) => this.tasks=data});
  }

  filterTasks(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  changeStatus(task:Task) {
    this.DataService.updateData(task).subscribe();
  }

  onDragStart(task: Task) {
    this.currentTask = task;
  }

  onDrop(status: string) {
    const dropTask = this.tasks.find((task) => task.ticketId === this.currentTask.ticketId);
    if (dropTask) {
      dropTask.status = status;
      this.changeStatus(dropTask)
    }
    this.currentTask = null;
  }

  onDragOver(event: any) {
    event.preventDefault();
  }
}
