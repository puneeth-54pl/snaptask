import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' })
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          content,
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ data })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
