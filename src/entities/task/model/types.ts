export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in_progress',
  Done = 'done',
}

export interface Task {
  readonly id: string
  readonly title: string
  readonly status: TaskStatus
}
