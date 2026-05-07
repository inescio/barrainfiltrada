import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ count: 0, averages: null, error: 'Supabase not configured' })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('ratings')
      .select('general_rating, aroma, acidity, sweetness, body, aftertaste')
      .gte('created_at', `${today}T00:00:00.000Z`)

    if (error) {
      console.error('Results API Supabase error:', error)
      return NextResponse.json({ count: 0, averages: null, error: error.message })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ count: 0, averages: null })
    }

    const avg = (key: string) =>
      Math.round((data.reduce((sum: number, r: Record<string, number>) => sum + (r[key] ?? 0), 0) / data.length) * 10) / 10

    return NextResponse.json({
      count: data.length,
      averages: {
        general_rating: avg('general_rating'),
        aroma: avg('aroma'),
        acidity: avg('acidity'),
        sweetness: avg('sweetness'),
        body: avg('body'),
        aftertaste: avg('aftertaste'),
      },
    })
  } catch (err) {
    console.error('Results API processing error:', err)
    return NextResponse.json({ count: 0, averages: null })
  }
}
