"use server"
import { cookies } from "next/headers";

export async function dellCookie() {

    cookies().delete('token')
}
