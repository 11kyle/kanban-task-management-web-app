import prisma from "@/app/utils/prisma"

export async function PUT(request: Request) {
  // id and isCompleted required
  const body = await request.json()
  const result = await prisma.subtask.update({
    where: {
      id: body.id
    },
    data: {
      isCompleted: body.isCompleted
    }
  })
}