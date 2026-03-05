import { NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { personalInfo, experience, education, skills } = body

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

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://inten.pro',
        'X-Title': 'inten.pro AI Resume Builder',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a precise JSON response generator. You only output valid JSON with no markdown code blocks.',
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
      })
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenRouter error:', err)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const result = await response.json()
    const content = result.choices[0]?.message?.content

    if (!content) throw new Error('No response from AI')

    // Strip any markdown code fences if model returns them
    const cleaned = content.replace(/^```json?\s*|```$/gm, '').trim()
    const parsed = JSON.parse(cleaned)

    return NextResponse.json(parsed)

  } catch (error: any) {
    console.error('Error generating resume:', error)
    return NextResponse.json({ error: error.message || 'Failed to generate resume' }, { status: 500 })
  }
}
