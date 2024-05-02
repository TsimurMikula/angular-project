import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TasksActions from "./tasks.action"
import { map, switchMap } from "rxjs";

@Injectable()
export class TasksEffect {

  constructor(private api: DataService, private action$: Actions){}
  
  loadTasks$ = createEffect(() => 
    this.action$.pipe(
        ofType(TasksActions.loadTasks),
        switchMap(() =>
          this.api.getTasks().pipe(
            map((data) => TasksActions.loadTasksSuccess({tasks: data}))
          )
        )
    )
  )

  updateTasks$ = createEffect(() => 
    this.action$.pipe(
        ofType(TasksActions.updateTasks),
        switchMap((action) =>
           this.api.updateTask(action.task).pipe(
            map(() => TasksActions.updateTasksSuccess({task: action.task}))
          )
        )
    )
  )
}