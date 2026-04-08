import express from 'express'
import { runAgent, client, SYSTEM_PROMPT } from '../agent/agent.js'

const router = express.Router()

// Health check
router.get('/', (req, res) => {
  res.json({ status: '🤖 AI API is running!' })
})

// Streaming chat
router.post('/chat', async (req, res) => {
  const { message, chatHistory = [] } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const { messages } = await runAgent(message, chatHistory)

    const stream = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      stream: true
    })

    let fullReply = ''
    for await (const chunk of stream) {
      const word = chunk.choices[0]?.delta?.content || ''
      if (word) {
        fullReply += word
        res.write(`data: ${JSON.stringify({ word })}\n\n`)
      }
    }

    res.write(`data: ${JSON.stringify({ done: true, fullReply })}\n\n`)
    res.end()

  } catch (err) {
    console.log('❌ Error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// Simple non-streaming chat
router.post('/chat/simple', async (req, res) => {
  const { message, chatHistory = [] } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const { messages } = await runAgent(message, chatHistory)

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ]
    })

    const reply = response.choices[0].message.content

    res.json({
      reply,
      chatHistory: [
        ...chatHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: reply }
      ]
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router