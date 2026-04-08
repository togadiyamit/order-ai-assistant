import db from '../config/db.js'

export async function getOrderByNumber(orderNumber) {
  const result = await db.query(
    `SELECT order_number, bill_date, buyer_entity_name,
     buyer_entity_mobile, total_invoice_amount, total_discount,
     total_payable_amount, order_status, payment_status,
     paid_amount, payment_due_date, ship_to_city, ship_to_state
     FROM distributor_orders WHERE order_number = $1 LIMIT 1`,
    [orderNumber]
  )
  if (result.rows.length === 0) return { error: 'Order not found' }
  return result.rows[0]
}

export async function getOrdersByBuyer(buyerName) {
  const result = await db.query(
    `SELECT order_number, bill_date, buyer_entity_name,
     total_payable_amount, order_status, payment_status, ship_to_city
     FROM distributor_orders
     WHERE LOWER(buyer_entity_name) LIKE LOWER($1)
     ORDER BY created_date DESC LIMIT 5`,
    [`%${buyerName}%`]
  )
  if (result.rows.length === 0) return { error: 'No orders found' }
  return result.rows
}

export async function getPendingPayments() {
  const result = await db.query(
    `SELECT order_number, buyer_entity_name, buyer_entity_mobile,
     total_payable_amount, paid_amount,
     (total_payable_amount - paid_amount) as pending_amount,
     payment_due_date, ship_to_city
     FROM distributor_orders
     WHERE payment_status = 1
     AND total_payable_amount > paid_amount
     ORDER BY payment_due_date ASC LIMIT 10`
  )
  if (result.rows.length === 0) return { message: 'No pending payments' }
  return result.rows
}

export async function getOrderSummary() {
  const result = await db.query(
    `SELECT COUNT(*) as total_orders,
     SUM(total_payable_amount) as total_revenue,
     SUM(paid_amount) as total_collected,
     SUM(total_payable_amount - paid_amount) as total_pending,
     COUNT(CASE WHEN order_status = 'pending' THEN 1 END) as pending_orders
     FROM distributor_orders`
  )
  return result.rows[0]
}