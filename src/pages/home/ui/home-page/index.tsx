import { useState } from 'react'
import { Title } from '@mantine/core'
import { TaskList, type TaskStatus } from '@/entities/task'
import { TaskStatusFilter, filterTasksByStatus } from '@/features/task-filter-status'
import { demoTasks } from '../../model/demo-tasks'
import styles from './index.module.scss'

export function HomePage() {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null)
  const visibleTasks = filterTasksByStatus(demoTasks, selectedStatus)

  return (
    <main>
      <Title order={1} className={styles.title}>Teamspace</Title>
      <section className={styles.section} aria-labelledby="tasks-heading">
        <Title order={2} id="tasks-heading" mb="md">Задачи</Title>
        <TaskStatusFilter value={selectedStatus} onChange={setSelectedStatus} />
        <TaskList tasks={visibleTasks} />
      </section>
    </main>
  )
}
