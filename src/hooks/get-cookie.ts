"use server"
import { cookies } from "next/headers";

export async function getCookie() {
    const token = cookies().get('token')

    return token?.value
}