import { NextResponse } from "next/server";
import prisma from "../../utils/prisma";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  console.log("what is going on")
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

  return NextResponse.json({ boards })
}

export async function POST(request: Request) {
  // name required in request
  const body = await request.json()
  const result = await prisma.board.create({
    data: {
      name: body.name,
    }
  })

  revalidatePath("/")
  
  return NextResponse.json({ result })
}

export async function DELETE(request: Request) {
  // id required in request
  const body = await request.json()
  // delete board
  const result = await prisma.board.delete({
    where: {
      id: body.id
    }
  })

  revalidatePath("/")

  return NextResponse.json({ result })
}

export async function PUT(request: Request) {
  // id and name in request
  const body = await request.json()
  // update board
  const result = await prisma.board.update({
    data: {
      name: body.name
    },
    where: {
      id: body.id
    }
  })

  return NextResponse.json({ result })
}