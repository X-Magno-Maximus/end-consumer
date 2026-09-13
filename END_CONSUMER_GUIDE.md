# Marxia End Consumer Guide

## Purpose

This repository is reserved for the consumer-facing Marxia shopping application. It will let a consumer discover an SMB, browse its tenant-scoped catalog, create an order, choose fulfillment, receive status updates, and manage only their own profile and order history.

## Current state

The repository currently contains a blank placeholder page. It has a shared EN/ES i18n runtime, but no consumer storefront is implemented. No live ordering or dashboard integration should be inferred from the placeholder.

## Planned connection to the SMB dashboard

| Consumer action | SMB dashboard result |
|---|---|
| Browse a tenant catalog | Reads published products, prices, availability, and tax display |
| Submit an order | Creates a tenant-scoped order for confirmation |
| Choose delivery, pickup, or on-site | Routes the order to the correct fulfillment workflow |
| Complete an approved payment flow | Updates payment status through the payment backend |
| Cancel or request support | Creates an auditable status or support event |

The consumer must never obtain SMB administrative access. All catalog, order, payment-status, and support operations must be tenant-scoped and authorized by the backend.

## Language support

- i18n.js supports English (en) and Spanish (es).
- The preference is stored under localStorage key marxia-language.
- New UI must use semantic keys and the documented data-i18n attributes.
- Consumer-entered data, business names, product names, addresses, currency values, and identifiers must not be translated.
- Page-specific keys must be registered when the storefront is? Actually no: Page-specific keys must be registered when the storefront is built.

## Required security and privacy boundary

- Deny access to another consumer's profile, address, orders, or support history.
- Enforce tenant isolation and object-level authorization on every backend request.
- Keep card data out of this repository; use compliant hosted payment components and tokenized references.
- Minimize stored contact and location data.
- Apply rate limits, bot protection, input validation, secure sessions, and auditable consent.
- Avoid exposing unpublished inventory, internal pricing, staff details, or SMB accounting data.

## Build sequence

1. Define tenant discovery, catalog, cart, order, fulfillment, and payment-status schemas.
2. Define guest and authenticated-consumer authorization rules.
3. Build the responsive EN/ES shell.
4. Implement catalog and cart.
5. Connect tenant-scoped order creation.
6. Connect fulfillment and payment-status updates.
7. Add order history, support, privacy controls, accessibility, and security tests.
