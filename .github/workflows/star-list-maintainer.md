---
description: |
  Keep starred repositories organized into existing GitHub star lists. On each run,
  review existing and new stars, assign each to the best matching existing list,
  and automatically move stars when another list is a better match.

on:
  schedule: daily
  workflow_dispatch:

permissions:
  contents: read

network:
  allowed:
    - github

tools:
  github:
    lockdown: true
    toolsets: [context, repos, stargazers]

safe-outputs:
  create-issue:
    max: 10
    title-prefix: "[star-list-maintainer] "
---

# Star List Maintainer

Ensure every starred repository is in one of my existing star lists.

## Instructions

1. Read my existing star lists and their names/descriptions.
2. Read my currently starred repositories and determine which list(s) each repo is already in.
3. For every starred repo, infer the best-matching list from list names/descriptions and repository metadata (name, description, topics, language, README summary when needed).
4. If a repo is not in any list, add it to the best-matching existing list.
5. If a repo is already in a list but another existing list is clearly a better match, move it to the better list automatically.
6. If there is no clear fit in any existing list, create a GitHub issue in this repository for manual review with:
   - repo owner/name and URL
   - why no list was a clear fit
   - top 2 candidate lists (if any) and reasoning
7. Never create new star lists automatically; only use existing lists.
8. Be idempotent: avoid duplicate list operations and only change what needs changing.
9. At the end, summarize:
   - repos added to lists
   - repos moved between lists
   - repos escalated for manual review

## Notes

- Run `gh aw compile` to generate the GitHub Actions workflow
- Keep operations limited to list maintenance and review issue creation
