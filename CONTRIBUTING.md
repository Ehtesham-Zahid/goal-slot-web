# Contributing to GoalSlot

Thanks for wanting to help. The single most important rule below is the
**claim-before-you-code** flow. Read it before you do anything else.

---

## Claim-before-you-code (the only rule we will reject PRs over)

We have multiple contributors and a small reviewer pool. To prevent two
people from spending days on the same feature only to have one PR get
discarded, every contribution must follow this flow:

1. **Pick an open issue.** Browse [open issues](https://github.com/ZeeshanAdilButt/goal-slot-web/issues)
   and find one that is not already assigned to someone else. Check the
   right-hand "Assignees" panel and read the comments before claiming.

2. **Comment your claim on the issue.** Post a single comment like
   `Can I work on this?` or `I want to take this`. Wait for a maintainer
   to reply with an explicit acknowledgement (typically `Thanks @you,
   this one is yours`) and to assign the issue to your GitHub account.

3. **Do NOT start writing code until the issue is assigned to you.** If
   the assignee field on the issue is not your account, you do not have
   approval to work on it. PRs that implement an issue assigned to
   somebody else will be closed, even if the code is good, because we
   already promised the work to the assigned contributor.

4. **If the issue has been assigned to someone else but they have not
   opened a PR in a week and have not commented**, you may post a polite
   comment asking if they would like to pass it on. Wait for the
   maintainer's call before starting. Do not begin work in parallel.

5. **For ideas that do not have an issue yet**, open a new issue first
   describing what you want to build. Wait for a maintainer to label it
   and assign it to you. Same flow as above. Do not open a PR without
   a maintainer-approved issue behind it.

If you skip this flow, we will close the PR with a pointer back to this
section. Sorry to be strict. We have had situations where two
contributors did the same work and one of them lost a weekend.

---

## What "assigned to you" looks like

You can verify a maintainer has assigned the issue to you in two ways:

- The issue's right-hand "Assignees" panel shows your GitHub avatar.
- A maintainer comment says something like `this one is yours` or
  `you are good to go`.

If neither is true, you are not assigned.

---

## Before opening a PR

- Run `pnpm install` and `pnpm dev` and verify the feature works end to
  end in the browser.
- Run `pnpm tsc --noEmit` and `pnpm lint` and fix everything they
  complain about. CI will run these and a red CI delays review.
- Test on the smallest viewport you care about. Most of our complaints
  come from mobile rendering, so open Chrome DevTools at 375 px width
  and click through your feature.
- If your PR is more than ~400 lines of diff, split it into 2 or 3
  smaller PRs that can be reviewed and landed independently. Long PRs
  sit in review for a long time.

## When opening a PR

- Reference the assigned issue at the top: `Related to #190` or
  `Closes #190`. The "Closes" form auto-closes the issue when the PR
  merges, so only use it on the PR that finishes the feature.
- Describe what changed in a short summary, then list the files you
  touched and why.
- Include a Loom (2 to 4 minutes is plenty) showing the feature working,
  embedded or linked in the PR description. Screenshots are fine for
  small fixes but visual features need a video.
- If your PR is one piece of a multi-PR feature, name which piece and
  which other PR it pairs with. For example: `PR 1 of 3, paired with
  goal-slot-api#48`.

## Pair PRs across repos

A feature that touches both `goal-slot-web` and `goal-slot-api` needs
both halves to ship together. Merging only the API half ships dead
endpoints; merging only the web half ships UI that 404s. If your
feature touches both repos:

- Open the PR on each repo at roughly the same time.
- Link them to each other in both descriptions.
- A PR with a missing counterpart will be held from merge until the
  other half exists.

## Comment style on PRs and issues

Write like a human who wants the next contributor to learn from this
thread. Useful over thorough. Lightly structured if needed. Avoid:

- `--` (double dashes), em-dashes (—), curly quotes, AI tells like
  "Certainly!" or "I'd be happy to".
- Long unstructured paragraphs that bury the point.
- Restating the diff in prose. The diff is the diff.

## Code review

- A maintainer will review within ~48 hours during the week.
- Address every comment. If you disagree with a comment, push back in
  the thread, do not just ignore it.
- After you push fixes, re-request review by re-pinging the maintainer
  with a short note like `Pushed the changes you asked for, ready when
  you are`.

## CodeRabbit

We have CodeRabbit attached to PRs. Its output is auto-review noise.
**Maintainers ignore it and so should you.** Do not respond to its
comments and do not feel pressured to address its suggestions unless a
human maintainer specifically points to one.

## Local setup

See [readme.md](readme.md) for the local dev setup. The API repo has
its own [CONTRIBUTING.md](https://github.com/ZeeshanAdilButt/goal-slot-api/blob/main/CONTRIBUTING.md)
with the backend setup steps.

## Questions

Open a discussion or comment on the relevant issue. Do not DM
maintainers directly for technical questions. Keeping the discussion
on the issue helps the next contributor.
