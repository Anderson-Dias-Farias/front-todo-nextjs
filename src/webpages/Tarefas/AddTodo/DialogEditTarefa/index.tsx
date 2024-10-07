import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ITask, ITaskEdit, TaskEditSchema } from "@/interfaces";
import { useFetch } from "@/hooks/use-fatch";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface DialogEditTarefaProps {
    children: React.ReactNode;
    task: ITask;
}


    export default function DialogEditTarefa({ children, task}: DialogEditTarefaProps) {
        const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm<ITask>({
        resolver: zodResolver(TaskEditSchema),
        defaultValues: {
            id: task.id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            status: task.status,
        }
    }); 

    const {fetchData} = useFetch()

    const onSubmit = async (data: ITask) => {
        const formattedData = {
            ...data,
            dueDate: new Date(data.dueDate)
        };
        const response = await fetchData(`/tasks/update`, "PUT", formattedData)
        if(response) {
            router.refresh()
            setOpen(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Adicionar Tarefa</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label className={errors.title ? "text-red-500" : ""}>{errors.title?.message ?? "Titulo"}</Label>
                 <Input
                        className="w-full"
                        placeholder="Digite o titulo da tarefa"
                        {...register("title")}
                    />
                    </div>
                <div className="flex gap-4 w-full sm:flex-row flex-col">
               
                 <div className="flex flex-col gap-2 w-full">
                    <Label>Status da tarefa</Label>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <Select
                                value={field.value ? "true" : "false"}
                                onValueChange={(value) => field.onChange(value === "true")}
                            >
                                <SelectTrigger className={field.value ? "text-green-500" : "text-red-500"}>
                                    <SelectValue placeholder="Status da tarefa"  />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true" className="text-green-500">Concluida</SelectItem>
                                    <SelectItem value="false" className="text-red-500">Pendente</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                 </div>
                 <div className="flex flex-col gap-2 sm:w-auto w-full">
                    <Label className={errors.dueDate ? "text-red-500" : ""}>{errors.dueDate?.message ?? "Vencimento"}</Label>
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <Input
                        className="w-full sm:w-auto"
                        type="date"
                        defaultValue={field.value ? field.value.toString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                 </div>
                </div>
               <div className="flex flex-col gap-2">
               <Label className={errors.description ? "text-red-500" : ""}>{errors.description?.message ?? "Descrição"}</Label>
               <Textarea
                    placeholder="Digite a descrição da tarefa"
                    {...register("description")}
                />
               </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Adicionando..." : "Adicionar"}</Button>
                </form>
               
            </DialogContent>
        </Dialog>
    )
}