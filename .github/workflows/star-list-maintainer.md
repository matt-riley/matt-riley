---
description: |
  Keep starred repositories organized into existing GitHub star lists using a
  reliable recommendation workflow. On each run, compare starred repositories
  against in-repo list metadata and assignment state, then report exact manual
  list actions when changes are needed.

on:
  schedule:
    - cron: "20 3 * * *"
  workflow_dispatch:

permissions:
  contents: read
  issues: read

network:
  allowed:
    - github

tools:
  github:
    lockdown: true
    github-token: "${{ secrets.STAR_LIST_PAT }}"
    toolsets: [context, repos, stargazers, issues]

safe-outputs:
  create-issue:
    max: 1
    labels: [star-list-maintainer]
    title-prefix: "[star-list-maintainer] "
  add-comment:
    max: 1
---

# Star List Maintainer

Produce reliable star-list maintenance recommendations from repository state files and starred repos.

## Instructions

1. Read `.github/star-lists.yml` (list catalog) and `.github/star-list-assignments.yml` (expected repo-to-lists mapping).
2. Read currently starred repositories for the authenticated user.
3. Infer one or more best-fit lists for each starred repo using list names/descriptions and repository metadata (name, description, topics, language, README summary if needed).
4. Compare inferred placement with `star-list-assignments.yml` and produce actionable diffs:
   - new starred repos without assignments
   - missing list memberships where a repo should be in additional lists
   - removal recommendations where a repo is assigned to a list that no longer fits
   - stale assignments for repos that are no longer starred
   - repos with no clear fit (include top candidates and why)
5. Never attempt to mutate GitHub Star Lists directly. This workflow is recommendation-only.
6. If there are no actionable diffs, emit a no-op completion summary and do not create or comment on issues.
7. If actionable diffs exist, maintain a single tracking issue:
   - find an existing open issue in this repo titled `[star-list-maintainer] Star list maintenance actions`
   - if found, add one comment with the current run report
   - if not found, create that issue with the full report
8. In every actionable report, include an `## Action checklist` section using strict checkbox command lines:
   - `- [ ] ASSIGN owner/repo -> list-id` to ensure membership in a specific list
   - `- [ ] REMOVE owner/repo -> list-id` to remove membership from a specific list
9. Also include:
   - confidence/reasoning for each recommendation
   - optional notes section for repos with no clear fit
10. A repo may appear in multiple checklist commands when it belongs in multiple lists; keep one command per repo/list pair.
11. Keep command lines machine-parseable and unique per action (no duplicate command entries).

## Notes

- Run `gh aw compile` to generate the GitHub Actions workflow
- Keep operations limited to recommendations, issue reporting, and assignment state updates
