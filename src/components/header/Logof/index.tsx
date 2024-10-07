'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { dellCookie } from "@/hooks/dell-cookie";
import { toast } from "@/hooks/use-toast";

interface LogofProps {
  token: string | undefined
}

export default function Logof({token}: LogofProps) {


  const Logout = () => {
    dellCookie()
    toast({
      title: 'Logout efetuado com sucesso',
      description: 'Você será redirecionado para a página de login',
      variant: 'default'
    })
  }

  if (token) {
    return (
      <Button variant="ghost" onClick={Logout}>
        <LogOutIcon size={16} className="text-red-500" />
      </Button>
    );
  }
}