import { NativeSelect } from '@mantine/core'
import { TaskStatus, taskStatusLabels } from '@/entities/task'
import styles from './index.module.scss'

interface TaskStatusFilterProps {
  readonly value: TaskStatus | null
  readonly onChange: (value: TaskStatus | null) => void
}

interface TaskStatusOption {
  readonly value: TaskStatus | ''
  readonly label: string
}

const statusOptions: readonly TaskStatusOption[] = [
  { value: '', label: 'Все' },
  ...Object.values(TaskStatus).map((status) => ({
    value: status,
    label: taskStatusLabels[status],
  })),
]

export function TaskStatusFilter({ value, onChange }: TaskStatusFilterProps) {
  return (
    <NativeSelect
      label="Статус задачи"
      className={styles.filter}
      value={value ?? ''}
      data={statusOptions}
      onChange={(event) => {
        const option = statusOptions.find(({ value }) => value === event.currentTarget.value)

        if (option) {
          onChange(option.value === '' ? null : option.value)
        }
      }}
    />
  )
}
