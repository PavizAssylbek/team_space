import { TaskStatus } from './types'

export const taskStatusLabels: Readonly<Record<TaskStatus, string>> = {
  [TaskStatus.Todo]: 'К выполнению',
  [TaskStatus.InProgress]: 'В работе',
  [TaskStatus.Done]: 'Готово',
}
