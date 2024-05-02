import { createReducer, on } from "@ngrx/store";
import * as TasksActions from "./tasks.action"
import { Task } from "../models/tasks/task";

export interface TasksState {
    tasks: Task[]
}

export const inititalTasksState: TasksState = {
    tasks: []
}

export const TasksReducer = createReducer(
    inititalTasksState,
    on(TasksActions.loadTasksSuccess, (state, action) => ({
        ...state,
        tasks: [...action.tasks]
    })),
    on(TasksActions.updateTasksSuccess, (state, action) => ({
        ...state,
        tasks: state.tasks.map(task => task.id === action.task.id ? action.task:task)
    })),
)