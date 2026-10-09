import { TaskList } from '@/entities/task'
import { demoTasks } from '../model/demo-tasks'
import styles from './HomePage.module.scss'

export function HomePage() {
  return (
    <main>
      <h1 className={styles.title}>Teamspace</h1>
      <section aria-labelledby="tasks-heading">
        <h2 id="tasks-heading">Задачи</h2>
        <TaskList tasks={demoTasks} />
      </section>
    </main>
  )
}
