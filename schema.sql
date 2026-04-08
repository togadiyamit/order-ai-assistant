-- Schema for distributor_orders
CREATE TABLE IF NOT EXISTS distributor_orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  bill_date DATE,
  buyer_entity_name VARCHAR(200) NOT NULL,
  buyer_entity_mobile VARCHAR(20),
  total_invoice_amount NUMERIC(12,2) DEFAULT 0,
  total_discount NUMERIC(12,2) DEFAULT 0,
  total_payable_amount NUMERIC(12,2) DEFAULT 0,
  order_status VARCHAR(50) DEFAULT 'pending',
  payment_status INTEGER DEFAULT 1,
  paid_amount NUMERIC(12,2) DEFAULT 0,
  payment_due_date DATE,
  ship_to_city VARCHAR(100),
  ship_to_state VARCHAR(100),
  created_date TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_distributor_orders_buyer_name
  ON distributor_orders (buyer_entity_name);

CREATE INDEX IF NOT EXISTS idx_distributor_orders_payment_status
  ON distributor_orders (payment_status);

CREATE INDEX IF NOT EXISTS idx_distributor_orders_created_date
  ON distributor_orders (created_date);

-- Sample data
INSERT INTO distributor_orders (
  order_number, bill_date, buyer_entity_name, buyer_entity_mobile,
  total_invoice_amount, total_discount, total_payable_amount,
  order_status, payment_status, paid_amount, payment_due_date,
  ship_to_city, ship_to_state
) VALUES (
  'ORD-1001', '2026-04-01', 'HealthPlus Pharmacy', '9876543210',
  25000.00, 1000.00, 24000.00,
  'pending', 1, 5000.00, '2026-04-15',
  'Hyderabad', 'Telangana'
);