import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
    console.log('Fetching all resumes...')
    const supabase = await createClient()

    // Fetch all resumes (no auth required)
    const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Supabase Error fetching resumes:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Successfully fetched ${data?.length} resumes`)
    return NextResponse.json(data)
}

export async function POST(req: Request) {
    console.log('Attempting to save resume...')
    const supabase = await createClient()

    try {
        const body = await req.json()
        const { title, content } = body

        console.log('Saving resume with title:', title)

        if (!title || !content) {
            console.error('Missing title or content in request body')
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
            console.error('Supabase Error saving resume:', error)
            throw error
        }

        console.log('Resume saved successfully with ID:', data?.id)
        return NextResponse.json(data)
    } catch (error: any) {
        console.error('CRITICAL ERROR saving resume:', error)
        return NextResponse.json({ 
            error: error.message || 'Failed to save resume',
            details: error.code || error.details || 'Supabase interaction failed'
        }, { status: 500 })
    }
}
