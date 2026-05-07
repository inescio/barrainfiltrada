import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ count: 0, error: 'Supabase not configured' })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const today = new Date().toISOString().split('T')[0]
    const { count } = await supabase
      .from('ratings')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00.000Z`)

    return NextResponse.json({ count: count ?? 0 })
  } catch (err) {
    console.error('Count API error:', err)
    return NextResponse.json({ count: 0 })
  }
}
