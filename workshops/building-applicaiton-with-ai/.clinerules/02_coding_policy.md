# Coding Policy: TDD, Unit Testing, E2E, and Commit/PR Rules

## 1. General Principles

- **Test-Driven Development (TDD):**  
  - Write tests before implementing new features or bug fixes.
  - Red/Green/Refactor cycle:  
    1. Write a failing test (Red)  
    2. Write minimal code to pass the test (Green)  
    3. Refactor code and tests for clarity and maintainability

- **Code Reviews:**  
  - All code must be reviewed before merging.
  - Reviewers should check for test coverage, code clarity, and adherence to this policy.

- **Documentation:**  
  - All public functions, components, and modules must have clear doc comments.
  - Update documentation as features evolve.

---

## 2. Unit Testing

- **Framework:**  
  - Use [Jest](https://jestjs.io/) for unit tests.
  - Use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for React components.

- **Coverage:**  
  - All business logic, utility functions, and React components must have unit tests.
  - Aim for 90%+ code coverage, but prioritize meaningful tests over coverage metrics.

- **Structure:**  
  - Place unit tests alongside the code under test, using `.test.ts` or `.test.tsx` suffixes.
  - Example: `src/features/recipes/services.test.ts`

- **Mocking:**  
  - Mock external services (e.g., Supabase) in unit tests.
  - Use dependency injection or mocking libraries as needed.

---

## 3. End-to-End (E2E) Testing

- **Framework:**  
  - Use [Playwright](https://playwright.dev/) for E2E tests.

- **Scope:**  
  - E2E tests should cover critical user flows:
    - Registration & login
    - Recipe creation, editing, deletion
    - Viewing recipe lists and details
    - Profile access

- **Structure:**  
  - Place E2E tests in `/e2e/` or `/playwright/e2e/` directory at the project root.

- **Data Management:**  
  - Use test accounts and reset database state before/after E2E runs.

---

## 4. Continuous Integration (CI)

- **Automated Testing:**  
  - All PRs must pass unit and E2E tests in CI before merging.
  - Use GitHub Actions or similar for CI setup.

- **Linting & Formatting:**  
  - Enforce linting (ESLint) and formatting (Prettier) in CI.

---

## 5. Commit and PR Practices

- **Pre-commit Requirements:**  
  - All tests (unit and E2E) and formatters must pass before committing any changes.
  - Do not commit code that fails tests or formatting.

- **PR Restrictions:**  
  - Do not push or open pull requests (PRs) using AI automation.
  - All PRs must be created and reviewed by a human.

---

## 6. Best Practices

- **Small, Testable Commits:**  
  - Each commit should represent a single, testable change.
  - Avoid mixing unrelated changes.

- **Refactoring:**  
  - Refactor code only with sufficient test coverage.
  - Run all tests after refactoring.

- **Error Handling:**  
  - All errors should be handled gracefully and tested.

---

## 7. Example Workflow

1. Write a failing unit/E2E test for a new feature.
2. Implement the minimal code to pass the test.
3. Refactor code and tests.
4. Ensure all tests and formatters pass.
5. Commit and push changes.
6. Ensure all tests pass in CI.
7. Submit for code review (by a human).

---

This policy ensures high code quality, maintainability, and confidence in your MVP as it evolves.
