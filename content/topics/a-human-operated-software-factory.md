---
title: "A human-operated software factory, not a dark one"
tag: Insight
status: idea
proposed_by: Matous Havlena
proposed_on: 2026-08-28
authors:
publish_date:
approved_by:
approved_on:
source_note: "content/notes/2026-08-28-software-factory-one-pager-assignment.md — the assignment brief and the team's current opinions from the 2026-08-28 software factory direction discussion, supplied by the proposer with this idea."
upstream_dependency: "Matous Havlena, 2026-08-28: work in progress. A one-pager is being written with Radek Jezek and Tomas Weiss and would be the starting point for this post; it goes to team review and then to an external stakeholder before it is settled. The post should not be drafted from the brief alone — wait for the agreed one-pager, and note that its positions may change in review."
---

Our take on what a software factory is, what it means for the business of
software engineering, and how someone builds one on DAM. Two halves: the vision,
then the opportunity.

The vision the team is arguing for is a **human-operated factory, not a dark
one**. The claim is not that software development gets automated away — it is
that the collaboration between the person and the agent gets automated, as far
as it will go, and that the models are not good enough for anything else today.
That makes the interesting question *where* the person belongs rather than
whether they do. The answer the team keeps arriving at is a small set of defined
touch points — context creation, business and architecture alignment, review and
approval — with everything between them automated. Two kinds of alignment do
different jobs and should not be collapsed: a technical grill with the agent
surfaces unknown problems, a discussion with people creates agreement on
direction.

The structural argument is that a factory is a **codified process, not a group of
agents deciding together**. Implement, review, approve, merge — fixed, which is
what makes parallel work safe; freely coordinating agents produce race
conditions instead. GitHub is both the channel and the state store, so the whole
factory state lives in issues, labels, PRs and commits: stop it, start it again,
and it continues without duplicating work, and people join in the same place the
agents work. Agents hand off through the channel rather than to each other
directly, because direct handover has no confirmation, no shared state and bad
timing. Events push work to agents; agents do not wake on a timer and go looking
for it, which mostly buys wake-ups that find nothing.

The second half is where DAM comes in — which building blocks exist, which are
missing, and what has to be added before someone can build their own factory on
it. The framing to keep: building blocks are not the story. Start from the
audience, then the pain, then the features, then the blocks. And the team is its
own first customer — building our own factory on DAM is how we find out what is
missing.

The post has to take positions against the state of the art rather than describe
it: factory.ai, the KubeStellar hive, and how Anthropic build and run their own
factories — including that they started with free agent groups and moved away
from them. Where those disagree with us, say so and say why.
