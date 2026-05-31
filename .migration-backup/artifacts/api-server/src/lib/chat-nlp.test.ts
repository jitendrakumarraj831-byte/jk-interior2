import test from "node:test";
import assert from "node:assert/strict";
import { detectIntent, normalizeHinglish, isRepetitiveReply } from "./chat-nlp.js";

test("detects pricing in Hinglish variants", () => {
  assert.equal(detectIntent("gypsom ceiling ka rate kitne mai"), "pricing");
  assert.equal(detectIntent("pvc ceiling ka price"), "pricing");
});

test("detects booking and off-topic correctly", () => {
  assert.equal(detectIntent("free site visit book karna hai"), "booking");
  assert.equal(detectIntent("ipl score kya hai"), "off_topic");
});

test("normalization improves typo handling", () => {
  assert.equal(normalizeHinglish("  gypsom   ceiling ka rate?? "), "gypsum ceiling ka rate");
});

test("repetitive reply guard", () => {
  assert.equal(isRepetitiveReply("Rate ₹80-140/sqft", ["Rate ₹80-140/sqft"]), true);
  assert.equal(isRepetitiveReply("Aap room size bhej dijiye", ["Namaste! Kaise help karu?"]), false);
});
