import { TaskStatus, type Task } from '../../model/types'
import styles from './index.module.scss'

interface TaskListProps {
  readonly tasks: readonly Task[]
}

const taskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.Todo]: 'К выполнению',
  [TaskStatus.InProgress]: 'В работе',
  [TaskStatus.Done]: 'Готово',
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>Нет задач</p>
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li className={styles.item} key={task.id}>
          <span className={styles.title}>{task.title}</span>
          <span className={styles.status}>{taskStatusLabels[task.status]}</span>
        </li>
      ))}
    </ul>
  )
}
