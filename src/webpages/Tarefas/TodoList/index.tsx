import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, CircleAlertIcon, Edit, Trash } from "lucide-react";
import DialogEditTarefa from "../AddTodo/DialogEditTarefa";
import { ITask } from "@/interfaces";
import { useFetch } from "@/hooks/use-fatch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressDate } from "@/components/ui/progressDate";
interface TodoListProps {
    tasks: ITask[];
}

export function TodoList({tasks}: TodoListProps) {
    const {fetchData} = useFetch()
    const router = useRouter()
    const [deleteTask, setDeleteTask] = useState<boolean>(false)

    const handleDelete = async (id: string) => {
        setDeleteTask(true)
      const response =  await fetchData(`/tasks/delete/${id}`, "DELETE", {})
     setDeleteTask(false)
     router.refresh()
    }
    

    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 py-4">
                {tasks.length > 0 ? tasks.map((task: ITask) => (
                <div key={task.id} className="flex items-center gap-4 justify-between w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-200 transition-all duration-300">
                    <div className="flex items-center justify-center gap-2 w-6">
                    {task.status ? <CheckCircle size={20} className="text-green-500" /> : <CircleAlertIcon size={20} className="text-red-500" />}
                    
                    </div>
                   <h1 className="w-full text-ellipsis truncate">{task.title}</h1>
                   <p className="w-full text-ellipsis truncate max-sm:hidden">{task.description}</p>
                   {task.status? <div className="w-full text-center text-green-500">Concluido</div>:  <ProgressDate targetDate={task.dueDate} />}
                    <div className="flex items-center justify-center sm:gap-4 gap-2">
                        <DialogEditTarefa  task={task}>
                            <Button variant="ghost" className="max-sm:p-0">
                                <Edit size={20} className="cursor-pointer text-blue-500" />
                            </Button>
                        </DialogEditTarefa>
                        <Button variant="ghost" className="max-sm:p-0" disabled={deleteTask} onClick={() => handleDelete(task.id)}>
                            <Trash size={20} className="cursor-pointer text-red-500" />
                        </Button>
                    </div>
                </div>
            )) : <div className="flex items-center justify-center w-full min-h-[60vh]">
                <h1 className="text-2xl font-bold italic">Não há tarefas</h1>
            </div>}
        </div>
    )
}