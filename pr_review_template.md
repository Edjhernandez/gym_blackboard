---
description: Use it when doing a Pull Request review on GitHub
globs:
alwaysApply: false
---

# Pull Request Review Template

All pull request (PR) reviews should follow this standardized format to ensure consistency, clarity, and thoroughness. This structure helps organize feedback, prioritize issues, and provide a clear action plan for the author.

## Review Philosophy

**Quality Standards:**

- **Maintain strict quality standards** - Code quality and best software development practices are non-negotiable requirements
- **Evaluate against business goals** - Always assess whether implementation aligns with business objectives and professional enterprise standards
- **Hold the team accountable** - High-quality benchmarks must be met; underperformance is unacceptable
- **Be professional but firm** - Communicate clearly when standards are not met while remaining constructive

**For Issues and Problems:**

- **Be detailed and educational** - Explain WHY something is problematic (security risk, architectural violation, performance impact, maintainability concern, business goal misalignment)
- **Provide concrete examples** showing both the problem and solution
- **Focus on learning** - Help the team understand the reasoning behind best practices
- **Explicit impact analysis** - Clearly articulate the consequences (security concerns, poor architectural patterns, technical debt, business risks)

**For Good Practices:**

- **Be encouraging but professional** - Acknowledge good work without excessive enthusiasm
- **Be concise** - Brief recognition is sufficient for things done well
- **Focus on impact** - Mention how good decisions benefit the project
- **Avoid redundancy** - Don't state obvious conclusions that are already clear from detailed issues

**General Guidelines:**

- **Never include time estimates** - Avoid estimating refactoring effort or development time
- **Focus on what, not when** - Describe what needs to be done, not how long it should take
- **Comprehensive coverage** - Address all aspects: security, architecture, type safety, error handling, testing, accessibility, i18n, documentation

## File Naming and Location Convention

All review markdown files must be:

- **Located in:** `ezpb_containers/pr_reviews/frontend/`
- **Named using the following formats,** where `XXXX` is the pull request number (zero-padded to four digits) and `vXXX` is the review revision (zero-padded to three digits, starting at `v001`):
  - **For open PRs (versioned):** `PR_XXXX_REVIEW_vXXX.md`
  - **For closed/merged PRs (retrospective):** `PR_XXXX_REVIEW_vXXX_RETROSPECTIVE.md`

Notes:

- Keep all prior versions to preserve review history when multiple review rounds occur for a single PR.
- Legacy files without a version suffix may exist; going forward, use the versioned naming convention for new or updated reviews.

**Complete path examples:**

- `ezpb_containers/pr_reviews/frontend/PR_0011_REVIEW_v001.md`
- `ezpb_containers/pr_reviews/frontend/PR_0034_REVIEW_v002.md`
- `ezpb_containers/pr_reviews/frontend/PR_0004_REVIEW_v003_RETROSPECTIVE.md`

For real-world examples of this template in action, please refer to:

- **Detailed issue analysis:** `ezpb_containers/pr_reviews/frontend/PR_0011_REVIEW_v001.md`
- **Balanced positive feedback:** `ezpb_containers/pr_reviews/frontend/PR_0034_REVIEW_v001.md`
- **Strict quality standards (recommended):** `ezpb_containers/pr_reviews/frontend/PR_0097_REVIEW_v001.md`

## Header Format

Every review document must start with the following structured header:

```markdown
# Pull Request Review: PR #XXXX - [Brief Title Description]

**Repository:** DBAccess-Organization/ezpb-frontend-portals  
**PR:** [#XXXX](https://github.com/DBAccess-Organization/ezpb-frontend-portals/pull/XXXX)  
**Author:** [github-username]  
**Date:** YYYY-MM-DD  
**Type:** [Active Review | Retrospective Analysis]

---
```

**Header Requirements:**

- Replace `XXXX` with the actual PR number
- Use a concise, descriptive title that captures the main purpose of the PR
- Include the actual GitHub username of the PR author
- Use the review creation date in YYYY-MM-DD format
- Include the AI model used for the review (e.g., Claude-3.5-Sonnet, GPT-4, etc.)
- Specify the analysis type:
  - **"Active Review"** for open PRs still under review
  - **"Retrospective Analysis"** for closed/merged PRs being analyzed post-mortem
- Always include the repository name and PR link for easy navigation
- The horizontal rule (`---`) separates the header from the review content

---

## Code Examples and Explanation Requirements

**CRITICAL:** Every review must include concrete code examples and detailed explanations to make feedback actionable and educational.

### For Issues and Problems:

For each significant issue identified, provide:

1. **❌ Problematic Code:** Show the actual problematic pattern from the PR
2. **🔍 Why This Is Bad:** Explicitly explain why this pattern is problematic (security risk, performance issue, architectural violation, maintainability concern, etc.)
3. **✅ Correct Alternative:** Demonstrate the proper implementation approach

### For Good Practices:

For positive aspects, provide:

- **Brief acknowledgment** without excessive detail
- **Encouraging but professional tone** (avoid overly enthusiastic language)
- **Focus on impact** rather than implementation details

### Example Format:

```typescript
// ❌ Current problematic pattern
const [data, setData] = useState([]);
useEffect(() => {
  fetch("/api/data").then((res) => setData(res.json()));
}, []);

// 🔍 Why this is bad:
// - No error handling - app will crash on network failures
// - No loading states - poor user experience
// - Manual state management - violates React Query architecture
// - Memory leaks - fetch continues even if component unmounts
// - No caching - unnecessary API calls on re-renders

// ✅ Correct approach using TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ["data"],
  queryFn: () => fetch("/api/data").then((res) => res.json()),
});
```

This approach ensures reviewers understand not just what's wrong and how to fix it, but **why** it matters.

---

## CRITICAL: Review Process Requirements

**MANDATORY FILE CONTENT RETRIEVAL:**

Before making any assessments about code issues, imports, dependencies, or existing patterns, you **MUST** retrieve the full content of all modified files. **Never rely solely on GitHub diff output** when evaluating code.

**Required Process:**

1. **Get PR file list** using `mcp_github_get_pull_request_files`
2. **Get diff overview** using `mcp_github_get_pull_request_diff` for change context
3. **Retrieve complete file content** for each modified file using:
   - `mcp_github_get_file_contents` for current state
   - `read_file` for local files when available
4. **Only then** analyze imports, dependencies, patterns, and architectural concerns

**Why This Is Critical:**

- **Prevents false positives** about missing imports that already exist
- **Ensures accurate context** about existing code patterns and architecture
- **Avoids incorrect assessments** about dependencies and file organization
- **Maintains review credibility** by preventing easily avoidable mistakes

**Example of Correct Process:**

```markdown
1. Identify modified files: ['component.tsx', 'utils.ts', 'types.ts']
2. Get diff for change overview
3. Retrieve full content for each file to understand complete context
4. Analyze actual code patterns, imports, and dependencies
5. Provide accurate, context-aware feedback
```

**What NOT to do:**

- ❌ Make claims about missing imports without checking full file content
- ❌ Assume dependencies based solely on diff additions
- ❌ Evaluate architecture without understanding complete file structure
- ❌ Comment on code organization without seeing full context

---

## 1. Overall Assessment

- **Purpose:** Provide a high-level summary of the PR with clear quality verdict.
- **Content:** Briefly describe the feature, its implementation quality, and whether it aligns with the project's goals and architecture. **Be direct and honest about quality issues** - if the implementation exhibits critical problems, state it clearly in professional language. Identify whether code meets professional software development standards required for production environments.
- **Tone:** Professional and firm when standards are not met, without being overly harsh or redundant. Let the detailed issues speak for themselves rather than repeating general quality assessments.

## 2. 🟥 Critical Blockers / Must-Fix Issues

- **Purpose:** List issues that **must** be resolved before the PR can be merged.
- **Content:** Include critical bugs, security vulnerabilities, or major violations of architectural principles. **MUST include code examples** showing the problematic pattern, **detailed explanation of why it's dangerous/problematic** (security risk, data loss, system failure, etc.), and correct alternative.

## 3. 🟡 Major Architectural Concerns

- **Purpose:** Highlight significant deviations from our established architecture.
- **Content:** Issues related to state management (e.g., incorrect use of TanStack Query), API design, data flow, or component structure that require refactoring. **MUST include code examples** and **detailed explanation of architectural violations** (scalability issues, maintainability problems, violation of SOLID principles, etc.).

## 4. 🟡 Component Architecture Issues

- **Purpose:** Address problems within specific components.
- **Content:** Feedback on component size (too large), responsibility (doing too much), prop drilling, or misuse of the component library. **Should include code examples** and **explain the maintainability/performance impact** of these patterns.

## 5. 🟡 Data Flow and API Concerns

- **Purpose:** Focus on how data moves through the application.
- **Content:** Issues with API request/response handling, data validation (e.g., with Zod), pagination, and authentication logic. **Should include code examples** and **explain the potential risks** (data corruption, security vulnerabilities, poor user experience).

## 6. 🟠 Form and Validation Issues

- **Purpose:** Detail problems related to forms and user input.
- **Content:** Feedback on form schema complexity, data transformation logic, and dependencies on mock data. **Should include code examples** and **explain why these patterns lead to bugs or poor user experience**.

## 7. 🟠 TypeScript and Type Safety Issues

- **Purpose:** Ensure the code is type-safe.
- **Content:** Point out usage of `any`, missing type definitions, incorrect type assertions, or other TypeScript-related problems. **Should include code examples** and **explain the runtime risks** (type errors, debugging difficulties, reduced IDE support).

## 8. 🟠 Performance and UX Concerns

- **Purpose:** Address issues affecting user experience and performance.
- **Content:** Mention unnecessary re-renders, inconsistent loading states, poor accessibility (a11y), or missing internationalization (i18n). **Should include code examples** and **explain the user impact** (slow app, poor accessibility, legal compliance issues).

## 9. 🟠 Code Quality and Maintenance

- **Purpose:** General code hygiene and long-term maintainability.
- **Content:** Note leftover `console.log` statements, inconsistent formatting, magic numbers/strings, and a lack of comments (JSDoc). **Should include code examples** and **explain the maintenance burden** these create for future developers.

## 10. 🔍 Missing Features and Considerations

- **Purpose:** Note what is missing from the PR.
- **Content:** Accessibility (a11y), internationalization (i18n), error boundaries, and testing considerations. **Should include code examples** of recommended implementations and **explain the business/technical risks** of omitting these features.

## 11. 📋 Recommended Action Plan

- **Purpose:** Provide a clear, step-by-step guide for the author to address the feedback.
- **Content:** Break down the required changes into logical phases (e.g., "Phase 1: Critical Fixes," "Phase 2: Architecture"). Reference the code examples and explanations provided in earlier sections.

## 12. ✅ Positive Aspects

- **Purpose:** Acknowledge what was done well with encouraging but professional tone.
- **Content:** **Briefly highlight** strengths like good architectural decisions, proper use of patterns, or solid implementation quality. **Avoid excessive detail or overly enthusiastic language.** Focus on the **positive impact** these decisions will have on the project.

## 13. Final Recommendation

- **Purpose:** State the final verdict on the PR with clear, professional guidance aligned with quality standards.
- **Content:** Clearly state `APPROVE`, `REQUEST_CHANGES`, or `COMMENT`. **Summarize the most critical actions required** and reference key issues that need attention. **Be encouraging about good practices** while being **firm about necessary improvements**.
- **Quality Emphasis:** When code doesn't meet standards, clearly communicate what must be addressed and emphasize the importance of professional development practices (testing, type safety, error handling, accessibility, i18n, documentation). Reference how the issues affect business goals, maintainability, security, or user experience.
- **Tone Guidelines:**
  - Be direct and professional when standards are not met
  - Avoid overly enthusiastic language in approvals
  - Avoid overly harsh or personal language in rejections
  - Don't repeat obvious conclusions that are clear from the detailed issues
  - Focus on actionable next steps
- **Important:** **Never include estimated refactoring time or effort** (e.g., "3-5 days to fix"). Time estimates are subjective, create pressure, and vary by developer experience. Focus on what needs to be done, not how long it should take.
