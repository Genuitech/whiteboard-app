# RHW Advisory Store (Stripe Checkout)

## Quick Start
1. Copy `.env.example` to `.env`
2. Add Stripe keys + price IDs
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:8787`

## Stripe Setup
- Create 4 products/prices in Stripe dashboard:
  - Advisory Pricing Engine Kit ($497)
  - 1040 Strategy Session Kit ($297)
  - Entity Decision Playbook ($397)
  - RHW Advisory Launch Bundle ($997)
- Add each Price ID into `.env`
- Set webhook endpoint:
  - `https://your-domain.com/webhook/stripe`
  - Event: `checkout.session.completed`

## Next Step
Connect fulfillment (email delivery / Drive access) in `server.js` webhook handler.
