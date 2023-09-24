import prisma from "@/app/utils/prisma"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
  const body = await request.json()
  const result = await prisma.task.delete({
    where: {
      id: body.id
    }
  })

  revalidatePath("/")

  return NextResponse.json({ result })
}

export async function POST(request: Request) {
  const body = await request.json()
  console.log(body)
  const { title, description, status, columnId } = body
  const result = await prisma.task.create({
    data: {
      title: title as string,
      description: description as string,
      status: status as string,
      column: {
        connect: {
          id: columnId as string
        }
      }
    }
  })

  revalidatePath("/")

  return NextResponse.json({ result })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const result = await prisma.task.update({
    data: {
      title: body.title,
      description: body.description,
      status: body.status
    },
    where: {
      id: body.id
    }
  })

  revalidatePath("/")

  return NextResponse.json({ result })
}