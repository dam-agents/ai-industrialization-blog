---
date: "2026-10-19"
source: "Slack, C0BQYQVQR1C — raw draft posted by Tomas Weiss, from a discussion with a colleague about the state of QA"
---

# My take on QA in the post-AI era

This is my current view. Parts of it are opinion and will probably change.

## More autonomy moves the work to the edges

As models get better, we give them more autonomy. I first wrote code with AI next to me. Then I let it write the code and I reviewed it. Then I stopped reading the code and read only the plan. Now I don't read the plan either. I only read how the agent splits the work into slices.

At each step, a human check in the middle went away. What's left are the two ends:

- **Context:** what the agent knows when it starts.
- **Validation:** how we know the result is right.

Validation has always been QA's job. That's why I think QA matters more now than ever.

## Code review was never the real safety net

I think a good model today writes code better than an above-average developer, and reviews code about as well as a person.

Human review has also become weaker, mostly because of volume. When AI writes most of the PRs, nobody can read all of them with care. You'll find a problem sometimes and miss one almost always. An AI reviewer finds different things and misses different things. Either way, bugs get through.

This isn't new. Before AI, I sometimes delegated work I knew how to do because I couldn't do everything myself. When the PR came back, I didn't always like it, and I approved it anyway. The review didn't protect the product. Two things did: a clear brief at the start and testing at the end. People always wrote bugs. Systems worked because someone tested them.

People also say AI-built software is buggy. I'm not sure it has more bugs for the same amount of work. A person ships features one by one and fixes the first before the next arrives. An agent ships six at once, so all the bugs show up at the same time.

## Context and validation come from the same ticket

**Context.** Our tickets describe the problem, never the solution. Before any plan, I go through the problem with the agent: it asks questions, proposes options, and I decide. Only then does it write a plan. Without that context it can't plan well, because it doesn't understand the problem yet.

The plan is split into slices. Each slice is small enough that a fresh agent with an empty context can build it. That keeps every agent in the smartest part of its context window.

**Validation.** A separate tester agent gets the ticket and the running product. It never sees the code. It tests the result as a black box, through the browser, like a user would.

So the ticket has two roles. It's the context for the agent that builds and the spec for the agent that tests. If the ticket is vague, both fail.

Our weak spot today is acceptance criteria. We describe problems well, but we describe what "done" looks like much less well.

## An example

A change went through our whole process. I worked through the problem with the agent, the code was clean, a colleague approved it, and it was merged. The feature showed the user a short message.

The tester marked it failed. The message was visible for half a second, then another program drew over it. No user would ever see it.

No code review could catch that. The code did what it should. The design was wrong, and I had missed it myself.

The tester also worked like a good QA engineer:

- It added screenshots to everything.
- To prove it wasn't faking, it reproduced the bug on main and gave me a before/after table.
- To show me a terminal, it streamed the terminal into the browser and took screenshots.
- In another test, it added a firewall rule to the test cluster to simulate a network failure.

A cheap manual tester would never do that. An experienced QA engineer would.

## Day shift and night shift

I see the tester doing two kinds of work.

**Day:** people run it on request, when a change is risky or they're unsure. Not every PR needs an automated test run.

**Night:** nobody is using the agents, so they run the full regression across the whole product and file bugs by morning. Developer agents pick them up early.

If I had to choose, regression matters more than testing single PRs. A PR test checks one change. Regression checks the product.

The night has a hard limit: time. If the regression doesn't fit, you have two options. Add more environments and testers, up to one per scenario. Or move some checks to cheaper automated tests.

It costs money, but a human QA engineer costs several times more. Even $2,000 a month for cloud is worth it, because the validation loop is what makes the faster pace safe. A small server at home can work too.

## The QA budget

When I worked close to QA teams, I used the term "QA budget." You can't test everything, so you choose what to test and where.

Many automation engineers wrote one small, isolated test per feature. That's right for unit tests. For end-to-end tests it's wrong, because setting up the environment is the expensive part. I prefer long user flows, where each step builds on the previous one.

The same trade-offs come back with agents. When a bug keeps returning, it's tempting to add another scenario to the regression. Sometimes that's right. Sometimes a unit test is the better fix. Making that call was the QA manager's skill, and it's worth even more now.

## Test against real services

Before AI, I designed systems so everything outside the core could be mocked. The end-to-end tests controlled those mocks through a special router. It worked very well.

It doesn't work for our product now. We need real model inference, real agent decisions and real login flows. A fake GitHub can't tell you whether an agent did the right thing in GitHub.

So we copy the real setup instead: a test Slack workspace, a test GitHub org, test accounts and repos. Before, tests couldn't drive real services. Now agents can.

## What stays human

You don't need to stay close to the code anymore. You do need to stay close to the product and know why each decision was made. You can't sell a product you don't understand.

If quality starts to slip and every release has more bugs, someone has to notice the trend. I'm not worried about what comes after. A couple of days with an agent is enough to understand the system and fix it.

## Still open

- Better acceptance criteria
- An environment for each PR
- Agents that work together through GitHub labels and comments, like people do
- What "AI-native QA" really means

I don't think we need to invent it from zero. Most of what good QA people knew still applies. Only who does the work changes.
