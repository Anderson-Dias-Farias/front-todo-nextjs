import { toast } from "@/hooks/use-toast";

export async function deleteTask(id: string, setRefresh: (refresh: boolean) => void) {
    console.log(id)
    setRefresh(true)
    fetch(`${import.meta.env.VITE_BASE_URL}/tasks/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${document.cookie.split("=")[1]}`,
        },
    }).then( async (response) => {
        setRefresh(false)
     
        if(response.ok){
            toast({
                title: "Tarefa deletada com sucesso",
                description: "A tarefa foi deletada com sucesso",
                variant: "default",
            });
            window.location.reload()
        } else {
            const error = await response.json();
            toast({
                title: "Erro ao deletar tarefa",
                description: error.error,
                variant: "destructive",
            });
        }
    }).catch((error) => {
        setRefresh(false)
        toast({
            title: "Erro ao deletar tarefa",
            description: error.message,
            variant: "destructive",
        });
    })
}