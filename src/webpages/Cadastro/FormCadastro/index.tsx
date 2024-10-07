"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICadastro } from "@/interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CadastroSchema } from "@/interfaces";
import { useFetch } from "@/hooks/use-fatch";
import { useRouter } from "next/navigation";
export default function FormCadastro() {

const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<ICadastro>({
    resolver: zodResolver(CadastroSchema)
})
const {fetchData} = useFetch()
const router = useRouter()


const onSubmit = async (data: ICadastro) => {
    const response = await fetchData(`/users/create`, "POST", data)
        if(response) {
            reset()
           router.push('/')
        }
}
    
    return (
        <Card className="max-w-[400px] w-full">
            <CardHeader >
                <div className="flex w-full items-center justify-between">
                <h1>Cadastro</h1>
                </div>
             
            </CardHeader>
            <CardContent >
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label className={errors.nome && 'text-red-500'}>{errors.nome?.message ?? 'Nome'}</Label>
                    <Input type="text" className="w-full" {...register('nome')} />
                </div>
            <div className="flex flex-col gap-2 w-full">
                    <Label className={errors.email && 'text-red-500'}>{errors.email?.message ?? 'Email'}</Label>
                    <Input type="email" className="w-full" {...register('email')} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label className={errors.password && 'text-red-500'}>{errors.password?.message ?? 'Senha'}</Label>
                    <Input type="password" className="w-full" {...register('password')} />
                </div>
                <Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Cadastrando...' : 'Cadastrar'}</Button>
            </form>
            </CardContent>
        </Card>
    )
}
