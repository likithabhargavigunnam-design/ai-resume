import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const supabase = await createClient()
    const id = params.id

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting resume:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
