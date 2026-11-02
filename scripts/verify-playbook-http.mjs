import assert from "node:assert/strict";
const base = process.env.PLAYBOOK_QA_ORIGIN || "http://localhost:3100";
for (const path of ["/nil-power-playbook", "/store", "/resources/nil-readiness-checklist", "/resources", "/services", "/", "/sitemap.xml", "/nil-power-playbook/download", "/nil-power-playbook/success"]) {
  const r = await fetch(base+path);
  assert.equal(new URL(r.url).origin, new URL(base).origin, "Preview access redirected to authentication; use an authorized Vercel session or approved protection bypass.");
  const body = await r.text();
  assert.equal(r.status,200,path);
  if (path === "/nil-power-playbook") {
    assert.match(body,/<h1/); assert.match(body,/proposed launch price/);
    assert.match(body,/https:\/\/nxtg3nsports.com\/nil-power-playbook/);
    assert.doesNotMatch(body,/InStock|aggregateRating/);
    assert.doesNotMatch(body,/Many athletes — and even parents/);
  }
  if (path === "/sitemap.xml") { assert.match(body,/\/nil-power-playbook/); assert.match(body,/\/resources\/nil-readiness-checklist/); }
  if (path === "/nil-power-playbook/download") assert.doesNotMatch(body,/googletagmanager.com|google-analytics.com/);
  console.log("PASS",path);
}
for (const path of ["/api/commerce/checkout", "/api/commerce/download", "/api/commerce/lead", "/api/commerce/webhook"]) {
  const r = await fetch(base+path,{ method:"POST", headers:{ "Content-Type":"application/json" }, body:"{}" });
  assert.ok([400,403,503].includes(r.status),`${path} unexpectedly succeeded`);
  console.log("PASS fail closed",path,r.status);
}
