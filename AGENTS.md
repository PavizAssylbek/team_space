# AGENTS.md

## What is Teamspace?

Teamspace is a project management and issue-tracking application inspired by Linear.

Reference: https://linear.app/

The goal is to build a modern, scalable, and maintainable application with a clean user interface and good user experience.

The project is developed incrementally, starting with basic functionality and expanding over time.

## Technologies

The project primarily uses:

- React
- TypeScript
- Feature-Sliced Design (FSD)
- Mantine (`@mantine/core` and `@mantine/hooks`) for ready-made UI components

Additional technologies and libraries will be introduced as needed.

Before using or installing new libraries, inspect the existing project dependencies.

## Application Architecture

The application follows Feature-Sliced Design (FSD).

### Project Structure

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

### FSD Layers

- **app** — Application initialization, providers, routing, and global configuration.
- **pages** — Application pages and route-level components.
- **widgets** — Large independent UI blocks composed of features and entities.
- **features** — User interactions and business functionality.
- **entities** — Business entities and their related logic.
- **shared** — Reusable UI components, utilities, API clients, and configuration.

### Architecture Rules

- Follow FSD principles and layer responsibilities.
- Higher layers may import from lower layers.
- Lower layers must not import from higher layers.
- Do not import between slices on the same layer unless an exception is explicitly documented.
- For allowed imports from lower layers, use the slice's public API (`index.ts`).
- A public API does not override layer dependency rules.
- Keep business logic out of the `shared` layer.
- Domain types such as `Task` and `TaskStatus` belong to `entities/task`, even when reused across multiple features or pages.
- Keep related code within its appropriate slice.
- Prefer composition over duplication.

Architecture decisions may evolve as the project grows.

## Coding Rules

- Write clean, readable, and maintainable code.
- Use TypeScript and avoid `any` whenever possible.
- Prefer `interface` for object contracts, domain models, and component props.
- Prefer string `enum` for finite named sets of domain values such as task statuses.
- Use a `type` alias only when `interface` or `enum` cannot express the required type, such as unions, intersections, mapped, or conditional types. Explain the reason for the exception.
- Type-only imports and exports (`import type` / `export type`) are encouraged; they are not type aliases.
- Use SCSS Modules named `index.module.scss` or `<component-name>.module.scss` for component styles and access local classes through the imported `styles` object.
- Prefer installed Mantine components for standard UI elements. Create custom primitives or wrappers only when the task requires them.
- Import Mantine's published `@mantine/core/styles.layer.css` once in the app entry. Vendor CSS is an intentional exception to the project's SCSS Module file convention; project component styles remain local SCSS Modules.
- Keep intentional application-wide base/reset styles in `app/index.module.scss` with explicit `:global` selectors. Keep component selectors local.
- Use the `@/` alias for imports from `src`, especially between FSD slices; continue using each slice's public API.
- Relative imports within a slice may use at most two parent-directory segments (`../../`). Use `@/` instead of deeper relative paths; the alias does not relax FSD dependency rules.
- Follow existing naming conventions.
- Use functional React components and hooks.
- Keep components small and focused.
- Avoid code duplication.
- Prefer simple solutions over unnecessary abstractions.
- Remove unused imports, variables, and code.
- Do not modify unrelated parts of the application.
- Follow existing code style and formatting rules.

### File Names and UI Component Structure

- Use `kebab-case` for source file and directory names, for example `task-list`, `task-list-item.tsx`, and `task-list-item.module.scss`.
- Keep React component, interface, and enum identifiers in PascalCase, for example `TaskList`, `Task`, and `TaskStatus`. Identifier casing does not determine file casing.
- Preserve canonical documentation names such as `AGENTS.md`, `README.md`, `PROGRESS.md`, and `ROADMAP.md`, and filenames required by tools or existing integrations.
- Within a slice's `ui` segment, give each component its own kebab-case directory. Do not place component implementations or their styles directly in `ui/`.
- For a directory containing one component, prefer `index.tsx` and `index.module.scss`.
- If a component directory contains several related UI components, use descriptive kebab-case filenames such as `task-list.tsx`, `task-list.module.scss`, `task-list-item.tsx`, and `task-list-item.module.scss`. Export the intended public component through that directory's `index.ts`.
- Application entry/composition files may stay directly in `app/`, using kebab-case names such as `index.tsx` and `index.module.scss`.

```text
entities/task/
├── index.ts
├── model/
│   └── types.ts
└── ui/
    └── task-list/
        ├── index.tsx
        └── index.module.scss
```

## Actions Requiring Permission

Unless an action has already been explicitly authorized, the agent must ask for permission before:

- Installing new dependencies.
- Removing existing dependencies.
- Changing FSD layer responsibilities or introducing a new architectural approach.
- Replacing existing libraries or frameworks.
- Deleting files or directories whose removal is not required by the task.
- Refactoring across multiple slices beyond what the requested change requires.
- Changing build tooling or disabling existing checks.

For work within the requested scope:

- Proceed autonomously with routine edits and checks within the requested scope.
- Routine changes within existing layers and slices are not architecture changes.
- An explicitly requested action is already authorized; do not ask for the same permission again.

The agent must never:

- Expose secrets or credentials.
- Delete unrelated code.
- Make unnecessary changes outside the task scope.
- Push changes to remote repositories without permission.

## How to Verify Work

After implementing changes:

1. Check for TypeScript errors.
2. Run the project's linter if available.
3. Run relevant tests if available.
4. Verify that the application builds successfully when appropriate.
5. Review the changes for potential issues.
6. Verify that FSD dependency rules are respected.

Use existing scripts defined in `package.json`.

- Find the actual verification commands in `package.json`; do not invent script names.
- Report each executed check and its result.
- Report checks that were not run and explain why.
- For UI behavior changes, verify the affected scenario and report how it was checked.

Do not claim that checks passed unless they were actually executed.

## Working Agreements

- Use the package manager declared by the repository and its lockfile. Prefer `pnpm` only when no package manager has been chosen.
- Reuse existing components and utilities.
- Keep changes small and focused.
- Avoid unnecessary refactoring.
- Explain important technical decisions.

## Git Commit Messages

- Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/): `<type>[optional scope][!]: <description>`.
- Use lowercase types: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `style`, `build`, `ci`, `chore`, or `revert`.
- Use `feat` for new functionality, `fix` for bug fixes, and `docs` for documentation-only changes. Choose the type by the change's purpose.
- Scope is optional; when useful, use a short lowercase area name such as `tasks` or `ui`.
- Write a concise English description in the imperative, without a trailing period. Describe the resulting change.
- Reserve `style` for formatting changes that do not affect behavior; visual UI changes are classified by their purpose, not automatically as `style`.
- Mark breaking changes with `!` before the colon or a `BREAKING CHANGE:` footer describing the compatibility impact.
- Keep each commit focused on a coherent change, including its related documentation. Review the staged diff and complete applicable checks before committing.

Examples:

```text
feat(tasks): add status filtering with Mantine
fix(tasks): restore all tasks when clearing the filter
docs: document commit conventions
```

## Repository Expectations

Before making changes:

1. Understand the task.
2. Inspect the relevant files.
3. Check existing implementations.
4. Choose the simplest reasonable solution.
5. Determine the appropriate FSD layer and slice.

Inspect existing working-tree changes before editing. Preserve user changes; do not reset, revert, or overwrite them unless explicitly requested.

After making changes:

1. Review modified files.
2. Remove unnecessary code.
3. Run relevant checks.
4. Verify FSD boundaries.
5. Provide a short summary of the changes.
6. Update `PROGRESS.md` when a task is completed or its status changes. Record actual verification results and distinguish implementation completion from demonstrated user understanding.
7. Update `ROADMAP.md` when milestones or agreed next steps change. Record significant architectural decisions in `docs/decisions/`.

## Code Review Rules

When reviewing code, pay attention to:

- Correctness
- Readability
- Type safety
- Maintainability
- Performance
- Reusability
- FSD architecture compliance
- Consistency with existing conventions

- For each finding, identify the location, triggering scenario, and concrete consequence.
- Separate correctness issues from optional suggestions.

Avoid suggesting unnecessary changes that do not improve the implementation.

## AI Agent Behavior

Act as an experienced Senior Frontend Developer.

- Do not introduce unnecessary dependencies.
- Suggest improvements when appropriate.
- Identify potential issues and technical debt.
- For actions requiring permission, follow the Actions Requiring Permission section.

Judge completion against the task's acceptance criteria and verification results.
