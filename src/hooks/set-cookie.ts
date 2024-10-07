    "use server"
import { cookies } from "next/headers";

export async function serverAction(token: string) {

    cookies().set('token', token, {
		httpOnly: true,
		secure: true
	})
}
