---
type: Framework Relationship Model
id: framework-relationship-model
title: Product and testing relationship model
status: stable
trust_status: reviewed
---

# Product and testing relationship model

Knowledge pages use these semantic relationships when connecting requirements
to verification and automation:

- `EXPECTED_BEHAVIOR` - a requirement has an expected product behavior.
- `HAS_MANUAL_TEST` - a requirement has a human-verifiable scenario.
- `HAS_AUTOMATED_TEST` - a requirement or scenario has an automated test.

Static graph relationships such as `NAVIGATES_TO`, `USES_PAGE`, and
`USES_SERVICE` remain machine-derived evidence for Page Objects, services,
fixtures, routes, and assertions. They are intentionally not duplicated in the
semantic registry. The semantic relationships above are human-authored or
workflow-produced product/testing traceability and must not be confused with
runtime behavior.
