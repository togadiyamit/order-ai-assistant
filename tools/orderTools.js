import {
  getOrderByNumber,
  getOrdersByBuyer,
  getPendingPayments,
  getOrderSummary
} from '../functions/orderFunctions.js'

// Tool definitions — AI reads these
export const tools = [
  {
    type: 'function',
    function: {
      name: 'getOrderByNumber',
      description: 'Get full details of a specific order by order number.',
      parameters: {
        type: 'object',
        properties: {
          orderNumber: { type: 'string', description: 'The order number' }
        },
        required: ['orderNumber']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'getOrdersByBuyer',
      description: 'Get recent orders for a specific buyer by name.',
      parameters: {
        type: 'object',
        properties: {
          buyerName: { type: 'string', description: 'Name of the buyer' }
        },
        required: ['buyerName']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'getPendingPayments',
      description: 'Get all orders with pending payments.',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'getOrderSummary',
      description: 'Get overall business summary.',
      parameters: { type: 'object', properties: {} }
    }
  }
]

// Tool runner — executes whichever tool AI picks
export async function runTool(name, args) {
  console.log(`🔍 AI querying: ${name}(${JSON.stringify(args)})`)
  if (name === 'getOrderByNumber') return await getOrderByNumber(args.orderNumber)
  if (name === 'getOrdersByBuyer') return await getOrdersByBuyer(args.buyerName)
  if (name === 'getPendingPayments') return await getPendingPayments()
  if (name === 'getOrderSummary') return await getOrderSummary()
  return { error: 'Unknown tool' }
}