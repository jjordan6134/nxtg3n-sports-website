import { commerceDb, deliverConfirmation } from "../src/lib/commerce";
// Run only in an authorized operator environment. No public admin endpoint.
async function main() {
 const db = commerceDb();
 try {
  const rows = await db`SELECT order_id FROM commerce_outbox WHERE status='pending' AND created_at>now()-interval '23 hours' ORDER BY created_at LIMIT 20`;
  for (const row of rows) {
    try { await deliverConfirmation(row.order_id); console.log("Confirmation processed", { orderId: row.order_id }); }
    catch { console.error("Confirmation needs review", { orderId: row.order_id }); process.exitCode = 1; }
  }
 } finally { await db.end(); }
}
main().catch(() => { console.error("Commerce retry unavailable; inspect configuration privately."); process.exitCode = 1; });
