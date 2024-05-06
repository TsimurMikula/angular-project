import { createAction, props } from "@ngrx/store";
import { Task } from "../models/task";


export const loadTasks = createAction('[Board Component] loadTasks');
export const loadTasksSuccess = createAction('[Board Component] loadTasksSuccess', 
    props<{tasks: Task[]}>()
);

export const updateTasks = createAction('[Board Component] updateTasks', 
    props<{task: Task}>()
);
export const updateTasksSuccess = createAction('[Board Component] updateTasksSuccess', 
    props<{task: Task}>()
);

