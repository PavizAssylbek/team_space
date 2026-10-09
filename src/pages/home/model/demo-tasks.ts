import { TaskStatus, type Task } from '@/entities/task'

export const demoTasks: readonly Task[] = [
  {
    id: 'task-1',
    title: 'Подготовить инструкции для агента',
    status: TaskStatus.Done,
  },
  {
    id: 'task-2',
    title: 'Реализовать список задач',
    status: TaskStatus.InProgress,
  },
  {
    id: 'task-3',
    title: 'Добавить фильтрацию по статусу',
    status: TaskStatus.Todo,
  },
]
