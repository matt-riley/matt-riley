---
description: |
  Sync checked star-list maintenance checklist commands into
  `.github/star-list-assignments.yml` by opening an automated pull request.

on:
  schedule:
    - cron: "0 3 * * *"
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
  update-issue:
    body: true
    max: 1
    target: "*"
---

# Star List Assignment Sync

Find the star-list tracking issue, apply checked checklist commands to `.github/star-list-assignments.yml`, and remove processed checked items from the issue body.

## Instructions

1. Resolve the star-list tracking issue:
   - for `issues` and `issue_comment` events, start from the triggering issue
   - for `workflow_dispatch`, find the open issue titled `[star-list-maintainer] Star list maintenance actions` (prefer one with label `star-list-maintainer`)
   If no matching issue is found, no-op.
2. Read the resolved issue body plus `.github/star-lists.yml` and `.github/star-list-assignments.yml`.
3. Parse only checked markdown task lines from the issue body (`- [x]` or `- [X]`) that match exactly:
   - `ASSIGN owner/repo -> list-id`
   - `REMOVE owner/repo`
4. Validate commands:
   - `owner/repo` must be valid `owner/name` format
   - `list-id` in `ASSIGN` must exist in `.github/star-lists.yml`
   Ignore invalid commands and include them in the workflow summary.
5. Apply valid commands idempotently:
   - `ASSIGN` sets or updates `assignments[owner/repo] = list-id`
   - `REMOVE` deletes `assignments[owner/repo]`
6. Write `.github/star-list-assignments.yml` with assignment keys sorted alphabetically.
7. Remove all checked checklist command lines (`- [x]`/`- [X]`) from the issue body so processed items are no longer mentioned in the issue.
8. If the issue body changed, update the tracking issue body using `update-issue` with replace semantics.
9. If file changes, create one draft pull request that includes:
   - applied commands
   - ignored/invalid commands
   - source issue URL
10. If neither issue body nor assignment file changed, no-op.
11. Never modify any file other than `.github/star-list-assignments.yml`.

## Notes

- Keep parsing strict and machine-safe; do not infer commands from freeform prose.
- This workflow only syncs assignment state. It does not mutate GitHub Star Lists.
