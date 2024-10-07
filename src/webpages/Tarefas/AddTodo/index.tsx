'use client'
import { Button } from "@/components/ui/button";
import DialogAddTarefa from "./DialogAddTarefa";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FilterIcon, FilterXIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface AddTodoProps {
    setFilter: (filter: boolean | null) => void
    filter: boolean | null
}

export default function AddTodo({setFilter, filter}: AddTodoProps  ) {
    const [open, setOpen] = useState(false)

    // Transformando DivButton em um componente de cliente
    const DivButton: React.FC<{ children: React.ReactNode, onClick?: () => void }> = ({ children, onClick }) => {
        return <div onClick={onClick} // Removendo a arrow function desnecessária
         className="w-full px-4 py-2 flex items-center text-sm justify-center bg-primary rounded-md text-white text-center cursor-pointer hover:bg-primary/90 transition-all duration-300">
                {children}
        </div>
    }

    const handleFilter = (filter: boolean | null) => {
        setFilter(filter)
        setOpen(false)
    }

    return (
        <div className="flex items-center justify-between w-full">  
             <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                    <DivButton>Filtrar {filter == null ? <FilterIcon size={16} className="ml-2" /> : <FilterXIcon size={16} className="ml-2" />}</DivButton> 
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 max-w-24 p-0">
                    <DivButton onClick={() => handleFilter(true)}>Concluido</DivButton>
                    <DivButton onClick={() => handleFilter(false)}>Pendentes</DivButton>
                    <DivButton onClick={() => handleFilter(null)}>Todas</DivButton>
                </PopoverContent>
             </Popover>
            <DialogAddTarefa >
                <Button>Adicionar Tarefa</Button>
            </DialogAddTarefa>
        </div>
    )
}