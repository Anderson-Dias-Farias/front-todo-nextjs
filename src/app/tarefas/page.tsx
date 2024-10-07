import Tarefas from "@/webpages/Tarefas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const token = cookies().get('token');
    if (!token) {
        redirect('/');
    }

    const tasks = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks/list`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        }
    });

    const tasksData = await tasks.json();
    if(tasksData.error) {
        redirect('/')
    }


    return <Tarefas tasks={tasksData.tasks as any} />;
}