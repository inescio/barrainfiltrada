import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || supabaseUrl === 'your-supabase-url' || !supabaseKey || supabaseKey === 'your-service-role-key') {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const body = await req.json()
  const {
    coffee_id,
    general_rating,
    aroma,
    acidity,
    sweetness,
    body: bodyRating,
    aftertaste,
    notes,
  } = body

  const { error } = await supabase.from('ratings').insert({
    coffee_id,
    general_rating,
    aroma,
    acidity,
    sweetness,
    body: bodyRating,
    aftertaste,
    notes,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
