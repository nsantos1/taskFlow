'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function createTask(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Você precisa estar logado.' }
  }

  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('owner_id', user.id)
    .eq('is_default', true)
    .single()

  if (!project) {
    return { error: 'Projeto padrão não encontrado.' }
  }

  const title = (formData.get('title') as string)?.trim()
  if (!title) {
    return { error: 'O título é obrigatório.' }
  }

  const dueDate = formData.get('due_date') as string

  const { error } = await supabase.from('tasks').insert({
    title,
    description: (formData.get('description') as string)?.trim() || null,
    status: formData.get('status') as string,
    priority: formData.get('priority') as string,
    category: (formData.get('category') as string)?.trim() || null,
    due_date: dueDate || null,
    user_id: user.id,
    project_id: project.id,
  })

  if (error) {
    return { error: 'Não foi possível criar a tarefa.' }
  }

  revalidatePath('/tasks')
  return { success: true }
}
