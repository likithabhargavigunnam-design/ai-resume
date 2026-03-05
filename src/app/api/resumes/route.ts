import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
    const supabase = await createClient()

    // Fetch all resumes (no auth required)
    const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching resumes:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

export async function POST(req: Request) {
    const supabase = await createClient()

    try {
        const body = await req.json()
        const { title, content } = body

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('resumes')
            .insert({
                title,
                content,
            })
            .select()
            .single()

        if (error) {
            throw error
        }

        return NextResponse.json(data)
    } catch (error: any) {
        console.error('Error saving resume:', error)
        return NextResponse.json({ error: error.message || 'Failed to save resume' }, { status: 500 })
    }
}
