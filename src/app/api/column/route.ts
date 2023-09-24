import prisma from "@/app/utils/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // column id is required
  const body = await request.json()
  const result = await prisma.column.findMany({
    where: {
      boardId: body.id
    }
  })

  revalidatePath("/")

  return NextResponse.json(result)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const result = await prisma.column.update({
    data: {
      name: body.name
    },
    where: {
      id: body.id
    }
  })

  revalidatePath("/")

  return NextResponse.json({ result })
}

export async function POST(request: Request) {
  const body = await request.json()
  const result = await prisma.column.create({
    data: {
      name: body.name,
      board: {
        connect: {
          id: body.boardId
        }
      }  
    }
  })

  revalidatePath("/")

  return NextResponse.json({ result })
}

export async function DELETE(request: Request) {
  const body = await request.json()
  const result = await prisma.column.delete({
    where: {
      id: body.id
    }
  })

  revalidatePath("/")

  return NextResponse.json({ result })
}