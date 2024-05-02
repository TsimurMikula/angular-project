import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TasksState } from "./tasks.reducer";

export const selectTasksFeature = createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(
    selectTasksFeature,
    (state: TasksState) => state.tasks
)
