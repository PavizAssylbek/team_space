import { useState, type FormEvent } from 'react'
import { Button, Drawer, Group, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TaskStatus, type Task } from '@/entities/task'

interface TaskCreateProps {
  readonly onCreate: (task: Task) => void
}

export function TaskCreate({ onCreate }: TaskCreateProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')

  function closeForm() {
    close()
    setTitle('')
    setTitleError('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (trimmedTitle.length === 0) {
      setTitleError('Введите название задачи')
      return
    }

    onCreate({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      status: TaskStatus.Todo,
    })
    closeForm()
  }

  return (
    <>
      <Button type="button" onClick={open}>Создать задачу</Button>
      <Drawer
        opened={opened}
        onClose={closeForm}
        position="right"
        title="Создать задачу"
        closeButtonProps={{ 'aria-label': 'Закрыть создание задачи' }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap="md">
            <TextInput
              label="Название задачи"
              placeholder="Введите название"
              value={title}
              error={titleError}
              onChange={(event) => {
                setTitle(event.currentTarget.value)
                setTitleError('')
              }}
              required
              data-autofocus
            />
            <Group justify="flex-end">
              <Button type="button" variant="default" onClick={closeForm}>Отмена</Button>
              <Button type="submit">Создать</Button>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  )
}
