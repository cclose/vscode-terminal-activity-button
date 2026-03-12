# Agent Instructions

## Before You Start

1. **Read `docs/spec.md`** — it is the single source of truth for extension behavior.
2. **Update `docs/spec.md`** whenever you change behavior, add features, or modify configuration.
3. **Read this file** for coding standards and project conventions.

## Project Context

This is a VS Code extension written in TypeScript. It is intentionally minimal and lightweight. Resist adding dependencies, abstractions, or complexity unless absolutely necessary.

## Coding Standards

- **No magic strings or numbers.** All semantic literals must be named constants.
- **Descriptive variable names.** `statusBarItem` over `sbi`.
- **Comment intent, not mechanics.** Explain *what* and *why*, not *how*.
- **Functional-style data flow.** Args in, return values out. Avoid mutation-as-side-effect.
- **Error messages as constants.** For grep-ability.
- **Never both log and return an error.** Choose one.
- **File boundaries follow semantic meaning.** No golf-bag files.

## IDE Problems & Warnings

- **Check the IDE Problems panel** before considering a task done.
- **Fix genuine issues.** Type errors, missing imports, real deprecations.
- **Acknowledge but don't rabbit-hole** on schema quirks, false positives, or warnings from third-party tooling that don't affect functionality. Note them and move on.
- **Ask if unsure** whether a warning is worth fixing or would creep the task scope.

## Build & Tooling

- **Makefile is the build entry point.** Targets: `build`, `test`, `lint`, `format`, `package`, `clean`, `help`.
- **esbuild for bundling.** Minified, tree-shaken, single output file.
- **Keep the bundle tiny.** The `vscode` module is external. No runtime dependencies.
- **Zero warnings policy.** Builds, packaging (`vsce package`), and `npm audit` should produce minimal warnings, deprecations, or vulnerabilities before a task is considered done. Best-effort to resolve simple issues. Ask if the task scope would creep too much.
- **Pin dependency versions.** After adding or updating dependencies, run `npm audit` and resolve any findings.

## Extension-Specific Rules

- **`vscode` is the only dependency.** It is external (provided by the host). Do not add npm runtime dependencies without very strong justification.
- **Activation should be instant.** No async initialization, no network calls, no file I/O at startup.
- **Respect user configuration.** Always check settings before creating UI elements.
- **Dispose everything.** All subscriptions, status bar items, and providers must be added to `context.subscriptions` or disposed in `deactivate()`.

## Testing

- Tests co-located with source when added.
- Prefer testing command logic in isolation where possible.

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/). No Jira tickets for this project.

```
type: short imperative description (max 50 chars)

- active verb describing change (adds, removes, fixes, updates, refactors)
- another change description
- focus on WHAT changed and WHY, not HOW
```

**Types:** `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`

**Rules:**
- Subject line: imperative mood, lowercase, no period
- Separate subject from body with blank line
- Bullet points with active present-tense verbs (adds, removes, fixes)
- Don't mention boilerplate (changelog bumps, version changes, file creation)
- Don't describe the obvious — be concise and specific

## PR Checklist

- [ ] `make build` passes
- [ ] `make package` passes
- [ ] `npm audit` — resolve what's reasonable, flag the rest
- [ ] `make lint` passes (when configured)
- [ ] `docs/spec.md` is up to date
- [ ] No hardcoded strings — use constants
- [ ] All disposables are properly managed
- [ ] No deprecated APIs or dependencies (best-effort; flag if unclear)

