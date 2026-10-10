import { useState } from 'react'
import { Group, Title } from '@mantine/core'
import { TaskList, type Task, type TaskStatus } from '@/entities/task'
import { TaskCreate } from '@/features/task-create'
import { TaskStatusFilter, filterTasksByStatus } from '@/features/task-filter-status'
import { demoTasks } from '../../model/demo-tasks'
import styles from './index.module.scss'

export function HomePage() {
  const [tasks, setTasks] = useState<readonly Task[]>(demoTasks)
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null)
  const visibleTasks = filterTasksByStatus(tasks, selectedStatus)

  function handleCreateTask(task: Task) {
    setTasks((currentTasks) => [...currentTasks, task])
  }

  return (
    <main>
      <Group justify="space-between" gap="md">
        <Title order={1} className={styles.title}>Teamspace</Title>
        <TaskCreate onCreate={handleCreateTask} />
      </Group>
      <section className={styles.section} aria-labelledby="tasks-heading">
        <Title order={2} id="tasks-heading" mb="md">Задачи</Title>
        <TaskStatusFilter value={selectedStatus} onChange={setSelectedStatus} />
        <TaskList tasks={visibleTasks} />
      </section>
    </main>
  )
}
