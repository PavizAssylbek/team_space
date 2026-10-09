import { Title } from '@mantine/core'
import { TaskList } from '@/entities/task'
import { demoTasks } from '../../model/demo-tasks'
import styles from './index.module.scss'

export function HomePage() {
  return (
    <main>
      <Title order={1} className={styles.title}>Teamspace</Title>
      <section className={styles.section} aria-labelledby="tasks-heading">
        <Title order={2} id="tasks-heading" mb="md">Задачи</Title>
        <TaskList tasks={demoTasks} />
      </section>
    </main>
  )
}
