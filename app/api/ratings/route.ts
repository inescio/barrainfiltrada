import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-supabase-url') || supabaseKey.includes('your-service-role-key')) {
    console.error('Supabase configuration missing or contains placeholders')
    return NextResponse.json({ error: 'Supabase configuration missing or incomplete' }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
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

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Request processing error:', err)
    return NextResponse.json({ error: 'Error processing request' }, { status: 400 })
  }
}
