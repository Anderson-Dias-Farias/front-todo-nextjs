"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

interface ProgressDemoProps {
  targetDate: Date
}

export function ProgressDate({ targetDate }: ProgressDemoProps) {
  const [progress, setProgress] = React.useState(0)
  const [daysLeft, setDaysLeft] = React.useState(0)

  React.useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const totalDays = (target.getTime() - now.getTime()) / (1000 * 3600 * 24)
      const daysLeftRounded = Math.ceil(totalDays)
      setDaysLeft(daysLeftRounded)

      // Calcula a porcentagem de progresso com base no total de dias
      const initialDate = new Date(targetDate)
      initialDate.setDate(initialDate.getDate() - 100) // Supondo 100 dias como duração máxima
      const totalDuration = (target.getTime() - initialDate.getTime()) / (1000 * 3600 * 24)
      const progressPercentage = Math.max(0, Math.min(100, ((totalDuration - daysLeftRounded) / totalDuration) * 100))
      setProgress(progressPercentage)
    }

    calculateProgress()
    const timer = setInterval(calculateProgress, 86400000) // Atualiza diariamente

    return () => clearInterval(timer)
  }, [targetDate])

  // Determina a cor de fundo com base na porcentagem de progresso

  return (
    <div className="relative w-full">
      <Progress value={progress} className="h-4 border border-slate-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="sm:text-xs text-[10px] text-black truncate">
          {daysLeft} { Math.abs(daysLeft) === 1 ? 'dia' : 'dias' } {daysLeft > 0 ? 'restantes' : 'em atraso'}
        </span>
      </div>
    </div>
  )
}

