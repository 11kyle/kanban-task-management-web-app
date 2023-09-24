"use server"

import prisma from "@/app/utils/prisma"
import { revalidatePath } from "next/cache"

export async function addTask(formData: FormData) {
  try {
    // title, description, and columnId is required
    const title = formData.get("title")
    const description = formData.get("description")
    const columnId = formData.get("columnId")

    console.log(name)

    await prisma.task.create({
      data: {
        title: title as string,
        description: description as string,
        status: "",
        columnId: columnId as string,
      }
    })

    revalidatePath("/")

    return {
      message: "Success! Task added."
    }
  } catch (error) {
    return {
      message: "Server error:", error
    }
  }
  
}