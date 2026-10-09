import { Box, Group, Paper, Text } from '@mantine/core'
import type { Task } from '../../model/types'
import { taskStatusLabels } from '../../model/status-labels'
import styles from './index.module.scss'

interface TaskListProps {
  readonly tasks: readonly Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <Text>Нет задач</Text>
  }

  return (
    <Box component="ul" className={styles.list}>
      {tasks.map((task) => (
        <Paper component="li" key={task.id} withBorder p="md" radius="md">
          <Group justify="space-between" gap="sm">
            <Text component="span" className={styles.title}>{task.title}</Text>
            <Text component="span" size="sm" c="gray.7" className={styles.status}>
              {taskStatusLabels[task.status]}
            </Text>
          </Group>
        </Paper>
      ))}
    </Box>
  )
}
