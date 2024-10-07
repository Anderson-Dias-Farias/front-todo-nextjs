import { z } from "zod";

export const schemaTask = z.object({
    title: z.string().min(1, { message: "Titulo é obrigatório" }),
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    dueDate: z.string().min(10, { message: "Obrigatório" }).transform((value) => {
        return new Date(value);
    }),

})

export type ITask = z.infer<typeof schemaTask>;