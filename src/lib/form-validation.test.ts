import test from "node:test";
import assert from "node:assert/strict";

import { validateContactForm, validateApplicationForm } from "./form-validation";

test("validateContactForm requires a name, valid email, and meaningful message", () => {
  const result = validateContactForm({
    name: "   ",
    email: "not-an-email",
    message: "Hi",
  });

  assert.equal(result.ok, false);
  assert.equal(result.errors.name, "Name is required.");
  assert.equal(result.errors.email, "Please provide a valid email address.");
  assert.equal(result.errors.message, "Message must be at least 20 characters.");
});

test("validateApplicationForm accepts complete athlete details", () => {
  const result = validateApplicationForm({
    name: "Jordan Lee",
    email: "jordan@example.com",
    sport: "Basketball",
    school: "North Ridge High",
    graduationYear: "2027",
    position: "Guard",
    goals: "I want to grow my NIL profile and sharpen my decision-making on the floor.",
    consent: true,
  });

  assert.equal(result.ok, true);
  assert.equal(result.errors, undefined);
});
