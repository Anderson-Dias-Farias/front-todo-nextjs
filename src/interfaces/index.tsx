import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({message: 'Email inválido'}),
    password: z.string().min(8, {message: 'Senha deve ter pelo menos 8 caracteres'}),
});

export const CadastroSchema = z.object({
    nome: z.string().min(3, {message: 'Nome deve ter pelo menos 3 caracteres'}).max(50, {message: 'Nome deve ter no máximo 50 caracteres'}),
    email: z.string().email({message: 'Email inválido'}),
    password: z.string().min(8, {message: 'Senha deve ter pelo menos 8 caracteres'}).max(25, {message: 'Senha deve ter no máximo 25 caracteres'})
});

export const TaskSchema = z.object({
    id: z.string(),
    title: z.string().min(3, {message: 'Título deve ter pelo menos 3 caracteres'}).max(25, {message: 'Título deve ter no máximo 25 caracteres'}),
    description: z.string().min(3, {message: 'Descrição deve ter pelo menos 3 caracteres'}).max(250, {message: 'Descrição deve ter no máximo 25 caracteres'}),
    status: z.boolean(),
    dueDate: z.date(),
});

export const TaskCreateSchema = z.object({
    title: z.string().min(3, {message: 'Título deve ter pelo menos 3 caracteres'}).max(25, {message: 'Título deve ter no máximo 25 caracteres'}),
    description: z.string().min(3, {message: 'Descrição deve ter pelo menos 3 caracteres'}).max(250, {message: 'Descrição deve ter no máximo 25 caracteres'}),
    status: z.boolean(),
    userId: z.string(),
});

export const TaskEditSchema = TaskSchema.omit({
    dueDate: true
}).extend({
    dueDate: z.string(),
}).refine((data) => {
    return new Date(data.dueDate)
}, {
    message: 'Data inválida',
    path: ['dueDate'],
});

export type ILogin = z.infer<typeof loginSchema>;
export type ICadastro = z.infer<typeof CadastroSchema>;
export type ITask = z.infer<typeof TaskSchema>;
export type ITaskCreate = z.infer<typeof TaskCreateSchema>;
export type ITaskEdit = z.infer<typeof TaskEditSchema>;
