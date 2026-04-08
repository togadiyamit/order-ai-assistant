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
INSERT INTO distributor_orders (
  order_number, bill_date, buyer_entity_name, buyer_entity_mobile,
  total_invoice_amount, total_discount, total_payable_amount,
  order_status, payment_status, paid_amount, payment_due_date,
  ship_to_city, ship_to_state
) VALUES
  ('ORD-1002', '2026-04-02', 'CityCare Medicals', '9123456789', 18000.00, 500.00, 17500.00, 'shipped', 2, 17500.00, '2026-04-05', 'Bengaluru', 'Karnataka'),
  ('ORD-1003', '2026-04-03', 'Wellness Drug House', '9988776655', 42000.00, 2000.00, 40000.00, 'pending', 1, 10000.00, '2026-04-18', 'Chennai', 'Tamil Nadu'),
  ('ORD-1004', '2026-04-04', 'Medline Supplies', '9090909090', 15000.00, 0.00, 15000.00, 'delivered', 2, 15000.00, '2026-04-06', 'Pune', 'Maharashtra'),
  ('ORD-1005', '2026-04-05', 'Apollo Pharmacy', '9876501234', 30000.00, 1500.00, 28500.00, 'pending', 1, 5000.00, '2026-04-20', 'Hyderabad', 'Telangana')
;