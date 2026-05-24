'use server'

import { createClient } from '@/utils/supabase/server'

export async function requestReset(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim()

  if (!email) {
    return { error: 'Informe seu email.' }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/nova-senha`,
  })

  if (error) {
    return { error: 'Não foi possível enviar o email. Tente novamente.' }
  }

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string

  if (!password || password.length < 6) {
    return { error: 'A senha precisa ter ao menos 6 caracteres.' }
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: 'Não foi possível atualizar a senha.' }
  }

  return { success: true }
}
