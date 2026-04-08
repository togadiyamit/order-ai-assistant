import Groq from 'groq-sdk'
import { tools, runTool } from '../tools/orderTools.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `
  You are a smart business assistant for a pharmaceutical distributor.
  You have access to real order data.
  Always format amounts in Indian Rupees (₹).
  Format dates as DD MMM YYYY.
  Be concise and professional.
  payment_status 1 = unpaid, 2 = paid.
`

export async function runAgent(userMessage, chatHistory = []) {
  const messages = [
    ...chatHistory,
    { role: 'user', content: userMessage }
  ]

  // Handle tool calls
  while (true) {
    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      tools: tools,
      tool_choice: 'auto'
    })

    const choice = response.choices[0]

    // No more tools needed — return messages for streaming
    if (choice.finish_reason === 'stop') {
      return { messages, systemPrompt: SYSTEM_PROMPT }
    }

    // Run tools AI requested
    if (choice.finish_reason === 'tool_calls') {
      messages.push(choice.message)
      for (const toolCall of choice.message.tool_calls) {
        const args = JSON.parse(toolCall.function.arguments)
        const result = await runTool(toolCall.function.name, args)
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result)
        })
      }
    }
  }
}

export { client, SYSTEM_PROMPT }