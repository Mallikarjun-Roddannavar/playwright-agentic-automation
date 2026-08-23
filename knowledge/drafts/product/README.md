---
type: Product Draft Guide
id: product-draft-guide
title: Product knowledge drafts
status: stable
trust_status: reviewed
---

# Product knowledge drafts

An external AI coding agent creates proposed product knowledge here from a raw
requirement in `requirements/incoming/`. Drafts remain separate from approved
knowledge until a human reviews the business meaning, acceptance criteria, and
ambiguities.

```text
requirements/incoming/REQ-*.md
        ↓
knowledge/drafts/product/REQ-*.md
        ↓ human review
knowledge/01-product/requirements/<feature>.md
```
