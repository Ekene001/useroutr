

**TAVIO**

**Product Documentation**

*Pay anything. Settle everywhere.*

Version 1.0  ·  February 2026

# **1\. Introduction**

Tavvio is a full-stack payment infrastructure platform for businesses and developers. It unifies traditional fiat payment rails with crypto-native infrastructure enabling anyone to accept or send money across blockchain networks and currencies through a single SDK, API, or no-code dashboard.

Tavvio is built on the Stellar blockchain, leveraging Stellar's native path payments, Soroban smart contracts, and its global anchor network to deliver near-instant, low-cost settlement in any currency. The platform bridges the gap that currently exists between fiat-native processors (like Stripe or Flutterwave) and crypto-native payment solutions giving businesses one place to handle everything.

## **1.1 Who is Tavvio for?**

Tavvio serves two primary audiences:

* Developers & Businesses (B2B) teams building fintech products, marketplaces, e-commerce platforms, or any application that needs to accept or disburse payments across currencies and chains.

* End Consumers (B2C) individuals paying for goods or services through a Tavvio-powered checkout, payment link, or invoice, using fiat or crypto from any supported wallet or bank.

## **1.2 The Problem Tavvio Solves**

Today's payment landscape is fragmented in two directions:

* Fiat-side: Accepting payments globally means integrating multiple processors, managing currency conversion, dealing with high fees, and navigating complex compliance requirements per region.

* Crypto-side: Every blockchain has its own tokens, wallets, liquidity silos, and developer tooling. A USDC on Ethereum is not the same as USDC on Solana forcing developers to build and maintain multi-chain infrastructure that most apps simply don't need.

Tavvio removes both layers of friction. Merchants choose where they want to settle fiat accounts, crypto wallet, or Stellar assets and Tavvio handles everything in between.

# **2\. Platform Architecture**

Tavvio is composed of four core layers that work together to route, convert, and settle payments.

## **2.1 Inbound Layer**

The inbound layer is responsible for receiving payments from any source a customer's credit card, bank transfer, or crypto wallet on any supported chain.

* Fiat inbound: Card payments (Visa/Mastercard) and bank transfers (ACH, SEPA, local rails) are processed via licensed payment partners and converted to stablecoins on Stellar.

* Crypto inbound (same-chain): Direct deposits of Stellar-native assets (XLM, USDC on Stellar, any SEP-asset) are received natively.

* Crypto inbound (cross-chain): Assets from EVM chains (Ethereum, Base, Avalanche, etc.) are bridged using Circle CCTP for USDC and Wormhole for broader asset support. Assets from Solana are bridged similarly via Wormhole.

## **2.2 Routing & Conversion Layer**

Once funds arrive on Stellar, the routing engine determines the optimal conversion path to the merchant's preferred settlement asset.

* Stellar Path Payments: Tavvio uses Stellar's native path payment mechanism (findStrictSendPaths / findStrictReceivePaths) to find the best multi-hop route across the Stellar DEX and AMM liquidity pools.

* Soroban Smart Contracts: Custom settlement logic, fee deduction, refund rules, and multi-tenant disbursement are handled by Soroban contracts deployed on Stellar Mainnet.

* Slippage protection and quote locking: Tavvio locks quotes for 30 seconds, ensuring the merchant receives exactly the quoted amount.

## **2.3 Settlement Layer**

Settlement is the final delivery of funds to the merchant or recipient. Tavvio supports three settlement modes:

* Crypto Settlement: Funds land in a Stellar wallet as any Stellar-native asset (USDC, XLM, or any anchored asset).

* Fiat Off-Ramp: Stellar anchors (regulated on/off ramp operators using SEP-6/SEP-24 standards) convert on-chain funds to fiat and deliver to a bank account or mobile money wallet.

* Cross-Border Fiat: Tavvio supports Fiat → Stellar → Fiat flows for cross-border payments, enabling businesses to send money internationally at Stellar's near-zero transaction cost.

## **2.4 Developer & Merchant Layer**

The top layer is what developers and merchants interact with directly:

* Tavvio SDK (JavaScript/TypeScript, Python, Go) \- embed payment flows directly into applications.

* Tavvio REST API \- full programmatic control over payments, quotes, webhooks, and account management.

* Tavvio Dashboard \- no-code tools for creating payment links, invoices, viewing transactions, and managing settings.

# **3\. Products**

Tavvio offers five core product modules. Each can be used independently or together as a unified payment stack.

## **3.1 Tavvio Gateway**

Tavvio Gateway is a hosted checkout experience that accepts fiat and crypto payments in a single, embeddable flow. Merchants integrate it with a script tag or SDK call and immediately gain access to every payment method Tavvio supports.

### **Key Features**

* Accepts credit/debit cards, bank transfers (ACH/SEPA/local rails), and crypto from 10+ chains in one checkout session.

* Hosted by Tavvio, PCI-DSS scope is handled entirely on Tavvio's infrastructure.

* Customizable branding: logo, colors, and domain via CNAME.

* Real-time conversion quotes shown to the payer before confirmation.

* Webhook notifications on payment status changes (pending, completed, failed, refunded).

### **Integration**

import { TavvioCheckout } from "@tavvio/sdk";

const checkout \= new TavvioCheckout({

  apiKey: "tv\_live\_xxxxxxxxxxxx",

  amount: 5000,      // in cents

  currency: "USD",

  settlementAsset: "USDC",

  orderId: "order\_123",

  onSuccess: (payment) \=\> console.log(payment),

});

checkout.open();

## **3.2 Tavvio Links**

Tavvio Links lets merchants generate shareable payment URLs in seconds with no code required. Links can be shared via WhatsApp, email, SMS, or embedded in any digital surface.

### **Key Features**

* Create a link from the dashboard in under 30 seconds.

* Set a fixed amount or allow the payer to choose the amount.

* Supports expiry dates, single-use or multi-use links.

* Accepts any Tavvio-supported payment method.

* Real-time dashboard notifications and webhook events.

* Shareable via QR code (auto-generated for every link).

### **API Creation**

POST /v1/payment-links

{

  "amount": 2500,

  "currency": "USD",

  "description": "Design consultation \- 1 hour",

  "expires\_at": "2026-03-01T00:00:00Z",

  "single\_use": false

}

## **3.3 Tavvio Invoicing**

Tavvio Invoicing provides a professional invoicing tool that lets businesses create, send, and track invoices with customers able to pay in fiat or crypto. Merchants always settle in their preferred currency.

### **Key Features**

* Create itemized invoices with line items, taxes, and discounts.

* Supports partial payments and installment schedules.

* Automatic payment reminders (3 days before, on due date, 3 days after).

* PDF invoice generation with merchant branding.

* Invoice status tracking: draft, sent, viewed, partially paid, paid, overdue.

* Multi-currency invoicing \- invoice in USD, EUR, NGN, or any supported currency.

### **Invoice Lifecycle**

Create → Send → Customer Views → Customer Pays (fiat or crypto) → Tavvio Routes & Converts → Merchant Settles

## **3.4 Tavvio Payouts**

Tavvio Payouts is a global disbursement engine. Businesses can send bulk payments to individuals or other businesses worldwide to bank accounts, mobile money wallets, or crypto wallets in a single API call.

### **Key Features**

* Bulk payout API: send to 1 or 10,000 recipients in one request.

* Supported destination types: bank account (local and SWIFT), mobile money (M-Pesa, MTN, Airtel), and crypto wallets on any supported chain.

* Automatic FX conversion at the time of disbursement.

* Payout scheduling: immediate, scheduled, or recurring.

* Per-payout status tracking with webhook events.

### **API Example**

POST /v1/payouts/bulk

{

  "payouts": \[

    {

      "recipient\_id": "rec\_abc123",

      "amount": 10000,

      "currency": "NGN",

      "destination": { "type": "mobile\_money", "provider": "mtn", "number": "+2348012345678" }

    },

    {

      "recipient\_id": "rec\_def456",

      "amount": 500,

      "currency": "USD",

      "destination": { "type": "bank\_account", "routing": "021000021", "account": "1234567890" }

    }

  \]

}

## **3.5 Tavvio On/Off Ramp**

Tavvio's on/off ramp module enables direct fiat-to-crypto and crypto-to-fiat conversion for end users or as a white-label service for platforms building their own ramp experience.

### **On-Ramp (Fiat → Crypto)**

* The user initiates a deposit in fiat (bank transfer, card, mobile money).

* Tavvio converts to the target crypto asset via Stellar anchors and path payments.

* Crypto lands in the user's specified wallet within seconds of fiat confirmation.

### **Off-Ramp (Crypto → Fiat)**

* Users send crypto to their Tavvio off-ramp address (any supported chain).

* Tavvio bridges and converts to stablecoin on Stellar, then uses anchor network to deliver fiat.

* Funds arrive in the user's bank account or mobile money wallet.

### **White-Label**

Platforms can embed Tavvio's ramp directly into their product via the SDK or iframe embed, with full custom branding and their own KYC flow via Tavvio's compliance API.

# **4\. Supported Networks, Currencies & Methods**

## **4.1 Fiat Currencies**

Tavvio supports fiat payments and settlement across major global currencies including USD, EUR, GBP, NGN, KES, GHS, ZAR, UGX, TZS, XOF, CAD, AUD, BRL, MXN, INR, and more. Coverage is expanding continuously. Refer to the Tavvio Dashboard for the live supported currency list.

## **4.2 Crypto Networks**

| Network | Inbound | Bridge Protocol |
| :---- | :---- | :---- |
| Stellar (Native) | ✓ Native | — |
| Ethereum | ✓ | CCTP / Wormhole |
| Base | ✓ | CCTP / Wormhole |
| Avalanche | ✓ | CCTP / Wormhole |
| Polygon | ✓ | Wormhole |
| Solana | ✓ | Wormhole |
| Arbitrum | ✓ | Wormhole |
| Optimism | ✓ | Wormhole |
| BNB Chain | ✓ | Wormhole |

## **4.3 Supported Tokens**

Tavvio supports USDC (native on Stellar via Circle), USDT, XLM, ETH, SOL, BTC (anchored), and any SEP-compliant Stellar asset. On inbound cross-chain flows, any Wormhole-supported token can be accepted and converted via Stellar path payments.

## **4.4 Payment Methods**

* Credit & Debit Cards: Visa, Mastercard, Verve (Africa)

* Bank Transfers: ACH (US), SEPA (EU/UK), local bank rails (Africa, LatAm, SEA)

* Mobile Money: MTN MoMo, M-Pesa, Airtel Money, Orange Money

* Crypto Wallets: MetaMask, Phantom, Coinbase Wallet, Rabby, and any WalletConnect-compatible wallet

* Stellar Wallets: Freighter, LOBSTR, and any SEP-10 compatible wallet

# **5\. API Reference**

The Tavvio API is a RESTful API that uses JSON for request and response bodies. All requests must be authenticated using your API key in the Authorization header.

## **5.1 Authentication**

Authorization: Bearer tv\_live\_xxxxxxxxxxxx

Use tv\_live\_ prefixed keys for production and tv\_test\_ prefixed keys for sandbox. API keys are generated and managed in the Tavvio Dashboard under Settings \> API Keys.

## **5.2 Base URL**

https://api.tavvio.io/v1

## **5.3 Core Endpoints**

| Method | Endpoint | Description |
| :---- | :---- | :---- |
| POST | /payments | Create a new payment |
| GET | /payments/:id | Retrieve a payment |
| POST | /quotes | Get a conversion quote |
| POST | /payment-links | Create a payment link |
| GET | /payment-links/:id | Retrieve a payment link |
| POST | /invoices | Create an invoice |
| POST | /invoices/:id/send | Send an invoice by email |
| POST | /payouts | Create a single payout |
| POST | /payouts/bulk | Bulk payout disbursement |
| GET | /payouts/:id | Retrieve payout status |
| POST | /refunds | Initiate a refund |
| GET | /transactions | List all transactions |
| POST | /webhooks | Register a webhook endpoint |

## **5.4 Create a Payment**

POST /v1/payments

{

  "amount": 10000,                  // Amount in smallest currency unit

  "currency": "USD",               // Source currency (ISO 4217\)

  "settlement\_asset": "USDC",      // Asset merchant receives

  "settlement\_network": "stellar", // Settlement destination

  "payment\_methods": \["card", "bank\_transfer", "crypto"\],

  "customer": {

    "email": "customer@example.com",

    "name": "Jane Doe"

  },

  "metadata": { "order\_id": "ord\_789" },

  "redirect\_url": "https://yourapp.com/payment/success"

}

### **Response**

{

  "id": "pay\_abc123",

  "status": "pending",

  "checkout\_url": "https://checkout.tavvio.io/pay/abc123",

  "amount": 10000,

  "currency": "USD",

  "expires\_at": "2026-02-21T12:30:00Z"

}

## **5.5 Get a Quote**

POST /v1/quotes

{

  "from\_currency": "ETH",

  "to\_currency": "USDC",

  "amount": 0.5,

  "direction": "send"   // "send" or "receive"

}

### **Response**

{

  "quote\_id": "qt\_xyz789",

  "from\_amount": 0.5,

  "to\_amount": 1523.40,

  "rate": 3046.80,

  "fee": 4.57,

  "expires\_at": "2026-02-21T12:00:30Z"   // 30 second lock

}

## **5.6 Error Handling**

All errors follow a consistent format with an HTTP status code, error code, and human-readable message.

{

  "error": {

    "code": "insufficient\_liquidity",

    "message": "Unable to find a conversion path for the requested amount.",

    "docs": "https://docs.tavvio.io/errors/insufficient\_liquidity"

  }

}

| HTTP Code | Error Code | Meaning |
| :---- | :---- | :---- |
| 400 | invalid\_request | Missing or malformed request parameters |
| 401 | unauthorized | Invalid or missing API key |
| 404 | not\_found | Resource does not exist |
| 409 | quote\_expired | Quote has expired, request a new one |
| 422 | insufficient\_liquidity | No path found for conversion |
| 429 | rate\_limited | Too many requests |
| 500 | internal\_error | Tavvio-side error |

# **6\. SDK Reference**

Tavvio offers official SDKs in JavaScript/TypeScript, Python, and Go. All SDKs wrap the REST API and provide typed interfaces, error handling, and convenient builder patterns.

## **6.1 JavaScript / TypeScript SDK**

### **Installation**

npm install @tavvio/sdk

### **Initialization**

import Tavvio from "@tavvio/sdk";

const tavvio \= new Tavvio({ apiKey: "tv\_live\_xxxxxxxxxxxx" });

### **Create a Payment**

const payment \= await tavvio.payments.create({

  amount: 5000,

  currency: "USD",

  settlementAsset: "USDC",

  paymentMethods: \['card', 'crypto'\],

  customer: { email: 'user@example.com' }

});

console.log(payment.checkoutUrl);

### **Create a Payout**

const payout \= await tavvio.payouts.create({

  amount: 200,

  currency: "USD",

  recipient: {

    name: "John Doe",

    destination: { type: "bank\_account", routing: "021000021", account: "9876543210" }

  }

});

## **6.2 Python SDK**

### **Installation**

pip install tavvio

### **Usage**

from tavvio import TavvioClient

client \= TavvioClient(api\_key="tv\_live\_xxxxxxxxxxxx")

payment \= client.payments.create(

    amount=5000,

    currency="USD",

    settlement\_asset="USDC",

    customer={'email': 'user@example.com'}

)

print(payment.checkout\_url)

## **6.3 Go SDK**

### **Installation**

go get github.com/tavvio-io/tavvio-go

### **Usage**

import "github.com/tavvio-io/tavvio-go"

client := tavvio.NewClient("tv\_live\_xxxxxxxxxxxx")

payment, err := client.Payments.Create(\&tavvio.PaymentParams{

    Amount:          5000,

    Currency:        "USD",

    SettlementAsset: "USDC",

})

# **7\. Webhooks**

Tavvio uses webhooks to notify your server of payment events in real time. Register a webhook endpoint in the Dashboard or via the API, and Tavvio will POST event data to that URL whenever a payment status changes.

## **7.1 Registering a Webhook**

POST /v1/webhooks

{

  "url": "https://yourapp.com/webhooks/tavvio",

  "events": \["payment.completed", "payment.failed", "payout.completed", "refund.created"\]

}

## **7.2 Event Types**

| Event | Triggered When |
| :---- | :---- |
| payment.pending | Payment created and awaiting payer action |
| payment.processing | Funds received, conversion in progress |
| payment.completed | Settlement confirmed for merchant |
| payment.failed | Payment expired or encountered an error |
| payout.initiated | Payout job started |
| payout.completed | Recipient funds delivered |
| payout.failed | Payout could not be completed |
| invoice.paid | Invoice fully settled |
| invoice.overdue | Invoice due date passed unpaid |
| refund.created | Refund initiated |
| refund.completed | Refund delivered to payer |

## **7.3 Webhook Payload**

{

  "id": "evt\_abc123",

  "type": "payment.completed",

  "created\_at": "2026-02-21T11:00:00Z",

  "data": {

    "payment\_id": "pay\_xyz789",

    "amount": 10000,

    "currency": "USD",

    "settlement\_amount": 99.42,

    "settlement\_asset": "USDC",

    "stellar\_txn\_hash": "a1b2c3d4...",

    "metadata": { "order\_id": "ord\_789" }

  }

}

## **7.4 Verifying Webhook Signatures**

All Tavvio webhook requests include a Tavvio-Signature header. You should verify this signature using your webhook secret to ensure the request originated from Tavvio.

const crypto \= require('crypto');

function verifyWebhook(payload, signature, secret) {

  const expected \= crypto

    .createHmac('sha256', secret)

    .update(payload)

    .digest('hex');

  return \`sha256=${expected}\` \=== signature;

}

# **8\. Refunds**

Tavvio supports full and partial refunds for completed payments. Refunds are routed back to the original payment method where possible. For crypto payments, the refund is sent to the originating wallet address in the original asset.

## **8.1 Initiating a Refund**

POST /v1/refunds

{

  "payment\_id": "pay\_xyz789",

  "amount": 5000,     // Omit for full refund

  "reason": "customer\_request"

}

## **8.2 Refund Rules**

* Refunds can be initiated up to 180 days after the original payment.

* Partial refunds can be issued multiple times up to the original payment amount.

* Crypto refunds are subject to network fees, which are deducted from the refund amount.

* Fiat refunds via card typically take 5–10 business days to appear. Bank transfer refunds take 1–3 business days.

* Crypto refunds to the originating wallet are processed within minutes via Stellar path payments.

# **9\. Dashboard**

The Tavvio Dashboard (dashboard.tavvio.io) is the no-code interface for managing your Tavvio account. It provides full visibility into transactions, tools to create payment links and invoices, and settings for API keys, webhooks, and team members.

## **9.1 Dashboard Sections**

| Section | Description |
| :---- | :---- |
| Overview | Real-time revenue summary, conversion volume, and payout balances |
| Payments | Full transaction list with search, filter, and export |
| Payment Links | Create, manage, and share payment links |
| Invoices | Create, send, and track invoices |
| Payouts | Initiate and monitor individual or bulk payouts |
| On/Off Ramp | Manage ramp transactions and KYC status |
| Analytics | Revenue charts, conversion rates, and failure analysis |
| Settings | API keys, webhooks, team members, branding, and compliance |

## **9.2 Team & Permissions**

Tavvio supports multiple team members per account with role-based access control:

* Owner \- full access including billing and API key management.

* Admin \- full access except billing and owner settings.

* Developer \- API key access, webhook management, read-only dashboard.

* Finance \- transaction history, payout initiation, invoice management, no API access.

* Viewer \- read-only access to all sections.

# **10\. Security & Compliance**

## **10.1 Security Practices**

* All API communication is encrypted in transit via TLS 1.3.

* API keys are hashed before storage and never returned in plaintext after creation.

* Webhook payloads are signed with HMAC-SHA256 for origin verification.

* Tavvio uses HSMs (Hardware Security Modules) for private key management of custodial Stellar accounts.

* Soroban smart contracts are audited by independent security firms prior to mainnet deployment.

* Tavvio operates on Stellar Mainnet only \- no shared keys with test environments.

## **10.2 KYC & AML**

Tavvio performs KYC (Know Your Customer) verification for merchants above certain transaction thresholds and for all on/off ramp users, in compliance with applicable financial regulations. AML transaction monitoring is applied to all payment flows.

* Merchant KYC: Required for accounts exceeding $10,000/month in processing volume.

* On/Off Ramp KYC: Required for all users initiating fiat conversion flows.

* AML screening: Real-time screening against OFAC, UN, and EU sanctions lists.

## **10.3 PCI DSS**

Tavvio's hosted checkout (Tavvio Gateway) is PCI DSS Level 1 compliant. Card data is never transmitted through or stored on merchant servers when using the hosted checkout flow.

# **11\. Roadmap**

| Phase | Timeline | Key Deliverables |
| :---- | :---- | :---- |
| Phase 1 Foundation | Q1 2026 | Soroban contracts, Stellar routing engine, developer dashboard, JS SDK, API v1 |
| Phase 2 Payment Products | Q2 2026 | Payment Gateway, Payment Links, Invoicing, Stellar anchor fiat on/off ramp, CCTP USDC bridge |
| Phase 3 Cross-Chain | Q3 2026 | Wormhole integration, 8 EVM chains live, Solana support, bank transfer rails (ACH/SEPA), Python & Go SDKs |
| Phase 4 Payouts | Q3 2026 | Global payout engine, mobile money support, bulk disbursement API, payout scheduling |
| Phase 5 Platform & Scale | Q4 2026 | Multi-tenant architecture, white-label ramp, enterprise SLAs, compliance reporting, advanced analytics |

# **12\. Glossary**

| Term | Definition |
| :---- | :---- |
| Anchor | A regulated Stellar network operator that bridges fiat currencies to Stellar assets and back |
| CCTP | Circle's Cross-Chain Transfer Protocol \- enables native USDC movement across supported blockchains |
| Path Payment | A Stellar-native transaction type that automatically converts assets across multiple hops using DEX liquidity |
| Soroban | Stellar's smart contract platform, used by Tavvio for settlement logic and escrow |
| SEP | Stellar Ecosystem Proposal \- a set of standards for interoperability between Stellar wallets and services |
| Settlement Asset | The asset that the merchant receives after a payment is processed and converted |
| On-Ramp | The process of converting fiat currency to crypto |
| Off-Ramp | The process of converting crypto to fiat currency |
| Wormhole | A cross-chain messaging protocol enabling asset transfers between Stellar and other blockchains |
| XLM | Stellar's native currency (Lumens), used for transaction fees and minimum account reserves |

© 2026 Tavvio. All rights reserved. docs.tavvio.io