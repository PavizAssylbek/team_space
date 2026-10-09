import type { Task, TaskStatus } from '@/entities/task'

export function filterTasksByStatus(
  tasks: readonly Task[],
  status: TaskStatus | null,
): readonly Task[] {
  return status === null ? tasks : tasks.filter((task) => task.status === status)
}
