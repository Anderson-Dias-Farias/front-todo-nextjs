'use client'
import { Card } from "@/components/ui/card";
import AddTodo from "./AddTodo";
import {TodoList} from "./TodoList";
import { useState } from "react";
import Tarefas from '@/webpages/Tarefas';
import { ITask } from "@/interfaces";

interface TarefasProps {
   tasks: ITask[]
}

export default function TarefasPage({tasks}: TarefasProps) {
    const [filter, setFilter] = useState<boolean | null>(null)

    const tasksFiltered = tasks.filter((task)=>{
        if(filter === null){
            return task
        }else{
            return task.status === filter
        }
    })

    return (
        <div className="flex flex-col items-center justify-center py-4 w-full h-full min-h-[70vh] overflow-y-auto">
            
            <Card className="p-4 w-full h-full min-h-[90vh] flex flex-col items-center justify-start">
                 <h1 className="text-2xl font-bold italic">Todo List</h1>
                 <AddTodo setFilter={setFilter} filter={filter} />

                 <TodoList tasks={tasksFiltered}/>
            </Card>
        </div>
    )
}


