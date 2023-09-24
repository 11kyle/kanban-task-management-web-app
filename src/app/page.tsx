import Dashboard from "./components/Dashboard"
import prisma from "./utils/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Home() {
  const boards = await prisma.board.findMany({
    include: {
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true
            }
          }
        }
      }
    }
  })

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <Dashboard fetchedBoards={boards} />
    </>
  )
}
