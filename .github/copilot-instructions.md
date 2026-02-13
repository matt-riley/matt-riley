# Copilot Instructions for this Repository

## Build, test, and lint commands
- This repository does not define an application build, test, or lint pipeline (no package manager manifest or test framework config is present).
- Workflow generation command:
  - `gh aw compile`
- Practical single-file validation for the current workflow change:
  - `gh aw compile && git --no-pager diff -- .github/workflows/daily-repo-status.lock.yml`

## High-level architecture
- This repo is currently a lightweight GitHub automation repo centered on Agentic Workflows.
- Authoring happens in Markdown workflow sources with frontmatter (for example `.github/workflows/daily-repo-status.md`).
- Execution happens from compiled workflow YAML (`.github/workflows/daily-repo-status.lock.yml`), which is generated from the Markdown source.
- Non-workflow content is minimal (`README.md` image-only and Renovate config in `.github/renovate.json`).

## Key conventions
- Treat `.github/workflows/*.lock.yml` as generated artifacts: do not hand-edit; edit the corresponding `.md` source and recompile.
- Keep workflow intent and behavior in the Markdown source file frontmatter/body; the lock file is output-only.
- `.gitattributes` marks lock files as `linguist-generated=true` and `merge=ours`, so source `.md` files are the durable review/change surface.
