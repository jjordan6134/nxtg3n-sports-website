BEGIN;
CREATE TABLE IF NOT EXISTS commerce_products (
 id text PRIMARY KEY, price_id text NOT NULL, price_cents integer NOT NULL CHECK(price_cents > 0),
 status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','coming-soon','active','archived')),
 file_version text NOT NULL, storage_path text NOT NULL, publication_approved boolean NOT NULL DEFAULT false,
 refund_policy text NOT NULL DEFAULT '', updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS commerce_orders (
 id uuid PRIMARY KEY, product_id text NOT NULL REFERENCES commerce_products(id), price_id text NOT NULL,
 amount integer NOT NULL, currency text NOT NULL DEFAULT 'usd', file_version text NOT NULL, storage_path text NOT NULL,
 session_id text UNIQUE, payment_intent text UNIQUE, email text,
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid','failed','refunded','disputed')),
 token_version integer NOT NULL DEFAULT 1, download_count integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS commerce_events (
 id text PRIMARY KEY, event_type text NOT NULL, order_id uuid REFERENCES commerce_orders(id), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS commerce_outbox (
 order_id uuid PRIMARY KEY REFERENCES commerce_orders(id), status text NOT NULL DEFAULT 'pending',
 attempts integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now(), sent_at timestamptz
);
CREATE TABLE IF NOT EXISTS commerce_rate_limits (key text PRIMARY KEY, hits integer NOT NULL, expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS commerce_leads (
 id uuid PRIMARY KEY, first_name text NOT NULL, email text NOT NULL, audience text NOT NULL,
 marketing_consent boolean NOT NULL DEFAULT false, consent_version text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE OR REPLACE VIEW commerce_sales_metrics AS SELECT product_id, currency, status, count(*) AS orders, sum(amount) AS amount_cents FROM commerce_orders GROUP BY product_id,currency,status;
ALTER TABLE commerce_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_leads ENABLE ROW LEVEL SECURITY;
COMMIT;
