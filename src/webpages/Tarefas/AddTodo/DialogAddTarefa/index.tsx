import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ITask, schemaTask } from "./schema";
import { useFetch } from "@/hooks/use-fatch";
import { useRouter } from "next/navigation";
interface DialogAddTarefaProps {
    children: React.ReactNode;
}


export default function DialogAddTarefa({children}: DialogAddTarefaProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ITask>({
        resolver: zodResolver(schemaTask),
    }); 
    const {fetchData} = useFetch()
    const router = useRouter()

    const onSubmit = async (data: ITask) => {
        const task = {
            title: data.title.trim(),
            description: data.description.trim(),
            dueDate:data.dueDate,
            status: false,
        }

        const response = await fetchData(`/tasks/create`, "POST", task)
        if(response) {
            reset()
           router.refresh()
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Adicionar Tarefa</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4 w-full sm:flex-row flex-col">
                 <div className="flex flex-col gap-2 w-full">
                    <Label className={errors.title ? "text-red-500" : ""}>{errors.title?.message ?? "Titulo"}</Label>
                 <Input
                        className="w-full"
                        placeholder="Digite o titulo da tarefa"
                        {...register("title")}
                    />
                 </div>
                 <div className="flex flex-col gap-2 sm:w-auto w-full">
                    <Label className={errors.dueDate ? "text-red-500" : ""}>{errors.dueDate?.message ?? "Vencimento"}</Label>
                    <Input
                        className="w-full sm:w-auto"
                        type="date"
                        placeholder="Data de vencimento"
                        {...register("dueDate")}
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