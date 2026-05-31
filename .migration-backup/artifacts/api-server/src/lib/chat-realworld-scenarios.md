# Real-world Chat Test Scenarios

## 1) Pricing + follow-up memory
- User: "Gypsum ceiling ka rate kya hai?"
- Bot: gives gypsum range + asks room size.
- User: "12x14"
- Bot: gives estimate using same gypsum context (no unrelated answer).

## 2) Hinglish location + serviceability
- User: "Patna me service milega kya?"
- Bot: confirms availability flow and asks locality.
- User: "Kankarbagh"
- Bot: continues location thread (no pricing detour).

## 3) Low confidence clarification
- User: "wo wala kitna"
- Bot: asks clarifying question instead of hallucinating.

## 4) Booking capture flow
- User: "visit book karna hai"
- Bot: asks name/city/phone naturally.
- User: "Rahul, Araria, 9876543210"
- Bot: confirms callback window and next step.

## 5) FAQ + non-repetitive behavior
- User: "warranty kitni hai"
- Bot: answers warranty/process.
- User: "same for pvc?"
- Bot: answers delta for PVC, avoids repeating full prior paragraph.
