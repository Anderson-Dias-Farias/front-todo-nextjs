import { dellCookie } from "./dell-cookie";
import { getCookie } from "./get-cookie";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";

export const useFetch = () => {

    const router = useRouter()

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    
    const fetchData = async (url: string, method: string, data: any) => {
        const token = await getCookie()
     const response = await fetch(`${BASE_URL}${url}`, {
        method: method,
        body: data ? JSON.stringify(data) : null,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
       })
       const responseData = await response.json()
       if(response.status === 401) {
        router.push('/')
        dellCookie()
        toast({
            title: 'Erro',
            description: 'Sessão expirada',
            variant: 'destructive'
        })
       }
       if(response.ok) {
        toast({
            title: 'Sucesso',
            description: responseData.message,
            variant: 'default'
        })
        return responseData
        
       }
       toast({
        title: 'Erro',
        description: responseData.error ? responseData.error : responseData.message,
        variant: 'destructive'
    })
    }

    return { fetchData }
}