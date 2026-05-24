import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Sidebar } from '@/components/sidebar'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const userName = profile?.full_name || user.email || 'Usuário'

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar userName={userName} userEmail={user.email ?? ''} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
