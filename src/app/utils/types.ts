export type Board = {
  id: string
  name: string
  columns: Column[]
}

export type Column = {
  id: string 
  boardId: string 
  name: string
  tasks: Task[]
  // board: Board 
}

export type Task = {
  id: string
  columnId: string
  description: string
  status: string
  title: string
  subtasks: Subtask[]
  // column: Column
}

export type Subtask = {
  id: string
  isCompleted: boolean
  taskId: string
  title: string
  // task: Task
}