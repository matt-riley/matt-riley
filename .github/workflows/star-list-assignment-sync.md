---
description: |
  Sync checked star-list maintenance checklist commands into
  `.github/star-list-assignments.yml` by opening an automated pull request.

on:
  issues:
    types: [edited, reopened]
  issue_comment:
    types: [created, edited]
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

network:
  allowed:
    - github

tools:
  github:
    lockdown: true
    toolsets: [context, issues, repos]

safe-outputs:
  create-pull-request:
    title-prefix: "[star-list-sync] "
    labels: [star-list-maintainer]
    draft: true
    if-no-changes: ignore
---

# Star List Assignment Sync

Apply checked checklist commands from star-list-maintainer issue content to `.github/star-list-assignments.yml`.

## Instructions

1. Determine triggering source content:
   - for `issue_comment` events, use the triggering comment body
   - for `issues` events, use the triggering issue body
2. Continue only if the related issue is the star-list tracking issue:
   - title is `[star-list-maintainer] Star list maintenance actions`
   - or label `star-list-maintainer` exists
   If neither condition is true, no-op.
3. Read `.github/star-lists.yml` and `.github/star-list-assignments.yml`.
4. Parse only checked markdown task lines (`- [x]` or `- [X]`) that match exactly:
   - `ASSIGN owner/repo -> list-id`
   - `REMOVE owner/repo`
5. Validate commands:
   - `owner/repo` must be valid `owner/name` format
   - `list-id` in `ASSIGN` must exist in `.github/star-lists.yml`
   Ignore invalid commands and include them in the workflow summary.
6. Apply valid commands idempotently:
   - `ASSIGN` sets or updates `assignments[owner/repo] = list-id`
   - `REMOVE` deletes `assignments[owner/repo]`
7. Write `.github/star-list-assignments.yml` with assignment keys sorted alphabetically.
8. If no file change results, no-op and do not create comments (avoid event-loop noise).
9. If file changes, create one draft pull request that includes:
   - applied commands
   - ignored/invalid commands
   - source issue URL and, if applicable, source comment URL
10. Never modify any file other than `.github/star-list-assignments.yml`.

## Notes

- Keep parsing strict and machine-safe; do not infer commands from freeform prose.
- This workflow only syncs assignment state. It does not mutate GitHub Star Lists.
