# QA Automation Project Context

## Application

- Application under test: https://demoqa.com/
- Language: JavaScript only
- Test runner: Playwright Test
- Architecture: Page Object Model
- External test data and fixtures
- Hooks and shared setup
- Allure Report and Playwright HTML report
- Screenshots, traces, and videos

## Integrations

- Jira project: `SCRUM`
- Jira board: https://abdullahayaz050.atlassian.net/jira/software/projects/SCRUM/boards/1
- GitHub: https://github.com/abdullahayaz050-sudo/DEMOQA
- Docker Desktop with Docker MCP Toolkit
- Jenkins MCP Server plugin or an explicitly installed local bridge

### Text Box coverage inventory

- DQA-ELEM-001: valid form submission
- DQA-ELEM-002: invalid email rejection
- DQA-ELEM-003: name with optional fields empty
- DQA-ELEM-004: empty form submission
- DQA-ELEM-005: multiline address preservation
- DQA-ELEM-006: malformed email variants
- DQA-ELEM-007: 64-character email local-part boundary

## Phase plan

### Phase 1 - MCP configuration

Configure and verify Atlassian/Jira, Microsoft Playwright, GitHub, Docker, and Jenkins MCP integrations. Stop after configuration and harmless read-only verification.

### Phase 2 - Framework foundation

Create the JavaScript Playwright Test project, configuration, TypeScript-free test structure, Page Object Model, external data, fixtures, hooks, environment handling, and reporting dependencies.

### Phase 3 - DemoQA test implementation

Implement focused browser tests for DemoQA modules. No test execution is part of Phase 1.

### Phase 4 - Reporting and CI integration

Wire Allure, Playwright HTML, screenshots, traces, videos, Jenkins pipeline, Docker test execution, and GitHub Actions if approved.

### Phase 5 - Stability and delivery

Add parallelism, retries, retries of transient failures only, trace review, self-healing safeguards, linting, pull-request checks, documentation, and operational runbooks.

## Repository guardrails

- Never commit tokens, passwords, cookies, or local secrets.
- Never trigger Jenkins builds, create Jira items, or push code during Phase 1.
- Use read-only operations for MCP verification.
- Clearly separate MCP results from CLI/API fallback results.
