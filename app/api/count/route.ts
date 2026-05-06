import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )
    const today = new Date().toISOString().split('T')[0]
    const { count } = await supabase
      .from('ratings')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00.000Z`)

    return NextResponse.json({ count: count ?? 0 })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
