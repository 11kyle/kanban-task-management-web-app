"use server"

import prisma from "@/app/utils/prisma"
import { revalidatePath } from "next/cache"

export async function addColumn(formData: FormData, activeBoardId: string) {
  try {
    // name and boardId is required
    const name = formData.get("name")
    const boardId = formData.get("boardId")

    console.log(name)
    console.log(boardId)

    await prisma.column.create({
      data: {
        name: name as string,
        board: {
          connect: {
            id: activeBoardId,
          }
        },
      }
    })

    revalidatePath("/")

    return {
      message: "Success! Column added."
    }
  } catch (error) {
    return {
      message: "Server error:", error
    }
  }
  
}