"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILogin } from "@/interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/interfaces";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/use-fatch";
import { serverAction } from "@/hooks/set-cookie";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function FormLogin() {

const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<ILogin>({
    resolver: zodResolver(loginSchema)
})
const {fetchData} = useFetch()
const [showPassword, setShowPassword] = useState(false)
const router = useRouter()

const onSubmit = async (data: ILogin) => {

    const response = await fetchData('/login', 'POST', data)

    if(response.token) {
        await serverAction(response.token)
        router.push("/tarefas")
    }
}
    
    return (
        <Card className=" w-full">
            <CardHeader >
                <div className="flex items-center justify-between">
                <h1>Login</h1>
                <a href="/cadastro" className="text-xs text-gray-500">Cadastrar?</a>
                </div>
             
            </CardHeader>
            <CardContent >
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 w-full">
                    <Label className={errors.email && 'text-red-500'}>{errors.email?.message ?? 'Email'}</Label>
                    <Input type="email" className="w-full" {...register('email')} />
                </div>
                <div className="flex flex-col gap-2 w-full relative">
                    <Label className={errors.password && 'text-red-500'}>{errors.password?.message ?? 'Senha'}</Label>
                    <Input type={showPassword ? 'text' : 'password'} className="w-full" {...register('password')} />
                    <div className="absolute right-1 top-[70%] transform -translate-y-1/2 cursor-pointer p-2">
                      {showPassword ? <EyeIcon size={16} onClick={() => setShowPassword(!showPassword)} /> : <EyeOffIcon size={16} onClick={() => setShowPassword(!showPassword)} />}
                    </div>
                </div>
                <Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Entrando...' : 'Entrar'}</Button>
            </form>
            </CardContent>
        </Card>
    )
}