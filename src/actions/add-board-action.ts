"use server"

import prisma from "@/app/utils/prisma"
import { revalidatePath } from "next/cache"

export async function addBoard(formData: FormData) {
  try {
    // name is required
    const name = formData.get("name")

    await prisma.board.create({
      data: {
        name: name as string
      }
    })

    revalidatePath("/")

    return {
      message: "Success! Board added."
    }
  } catch (error) {
    return {
      message: "Server error:", error
    }
  }
  
}