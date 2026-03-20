import { NextResponse } from 'next/server'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function POST(req: Request) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  try {
    const body = await req.json()
    const { personalInfo, experience, education, skills } = body

    console.log('Generating resume for:', personalInfo?.fullName)

    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY is missing from environment variables')
      return NextResponse.json({ error: 'Server configuration error: Missing API Key' }, { status: 500 })
    }

    if (!personalInfo) {
      return NextResponse.json({ error: 'Personal info is required' }, { status: 400 })
    }

    const prompt = `
      You are an expert resume writer. I am providing you with rough details of a candidate.
      Your task is to generate a professional, ATS-friendly resume in JSON format exactly matching the schema below.
      Improve the phrasing, make it action-oriented, and highlight impact. Do not hallucinate entirely new jobs, but you can enhance the descriptions of the provided ones.
      
      Details provided:
      Personal Info: ${JSON.stringify(personalInfo)}
      Experience: ${JSON.stringify(experience)}
      Education: ${JSON.stringify(education)}
      Skills: ${JSON.stringify(skills)}

      Respond ONLY with a valid JSON object matching this structure (no markdown blocks, no extra text):
      {
        "personalInfo": {
          "fullName": "...",
          "email": "...",
          "phone": "...",
          "location": "...",
          "linkedin": "...",
          "portfolio": "..."
        },
        "summary": "Professional summary paragraph...",
        "experience": [
          {
            "company": "...",
            "role": "...",
            "startDate": "...",
            "endDate": "...",
            "achievements": ["Action-oriented bullet 1", "Action-oriented bullet 2"]
          }
        ],
        "education": [
          {
            "institution": "...",
            "degree": "...",
            "graduationDate": "..."
          }
        ],
        "skills": ["Skill 1", "Skill 2"]
      }
    `

    console.log('Sending request to Groq...')
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a precise JSON response generator. You only output valid JSON with no markdown code blocks.',
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Groq API error:', response.status, err)
      return NextResponse.json({ error: `AI Generation Error: ${response.status} - ${err.substring(0, 100)}` }, { status: response.status })
    }

    const result = await response.json()
    console.log('Received response from Groq')
    const content = result.choices[0]?.message?.content

    if (!content) {
      console.error('No content in Groq response:', JSON.stringify(result))
      throw new Error('No response from AI')
    }

    let parsed;
    try {
      parsed = JSON.parse(content)
      console.log('Successfully parsed AI response')
    } catch (e) {
      console.error('Failed to parse AI response content:', content)
      return NextResponse.json({ error: 'AI returned invalid JSON format' }, { status: 500 })
    }

    return NextResponse.json(parsed)

  } catch (error: any) {
    console.error('CRITICAL ERROR in /api/generate:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to generate resume',
      details: error.stack?.substring(0, 200)
    }, { status: 500 })
  }
}
