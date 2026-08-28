---
date: "2026-08-28"
source: meetings/2026-08-28-software-factory-direction.md
---

# Software Factory One-Pager — Assignment

We discussed the software factory direction on 28 Aug 2026. We want you to own this topic and write a one-pager. This document gives the assignment and the highlights from our discussion. The highlights are our current opinions, not facts. You can disagree with any of them. If you disagree, push back and give us your argument. The one-pager itself must represent the opinion of the team.

## The assignment

Write a one-pager with two parts:

1. **The business vision.** How we see software factories today and in the near future. What the business implications for software engineering are. Where people stay necessary in the process, and where they are not necessary. Why the goal is efficient collaboration, not full automation.
2. **The DAM opportunity.** Where DAM can bring value for this vision. Which building blocks DAM already has, and which blocks are missing. What we must add so that users can build their own factory on DAM.

The audience is our external stakeholder. After the one-pager, the stakeholder must understand the problem, our view, and the opportunity for DAM.

The one-pager can also become the starting point for a template: how to build software factories with DAM. Our stakeholder prepares a blog with the name AI Industrialization, and this template could be content for it.

## Required research

Before you write, do a deep dive into the state of the art. Study these three at minimum:

- **factory.ai**
- **The KubeStellar hive**
- **Anthropic** — how they build and run their own software factories

Compare their approaches with our opinions below. Where they disagree with us, take a position.

## Process

1. You write the draft. If you want to talk first, schedule a call with us.
2. Send the draft to us. Then we review it together.
3. After our agreement, we pitch it to the stakeholder.

## Highlights from the discussion — our current opinions

### A human-operated factory, not a dark factory

We do not try to automate software development away. We make the collaboration between the agent and the person as automated as possible. The person stays important in the process. The models are not good enough for a dark factory today.

### The process is codified, not agent-driven

A software factory is a codified process, not a group of agents that decide together. The development process is fixed: implement, review, approve, merge. A static workflow makes parallel work safe. Agents that coordinate freely create race conditions. Anthropic started with free agent groups and moved away from them.

### Push, not poll

Agents must receive events when work exists. Agents must not wake up on a schedule and search for work. Polling burns tokens without limit. An automated review agent that runs on a schedule spends most of its cost on wake-ups that find no work.

### GitHub is the channel and the state store

GitHub holds the full state of the factory: issues, labels, PRs, commits. This gives idempotency. When the factory stops, you start it again and it continues without duplication. People join the factory in the same place as the agents. Agents hand work to each other through the channel, not directly. Direct agent-to-agent handover has problems: no confirmation, no shared state, and bad timing. A first prototype is GitHub-first: an agent with a skill helps you configure the factory, like our Slack integrations today.

### The person has defined touch points

We select the points where a person must enter the process. Everything between these points is automated. The touch points are: context creation (grilling), business and architecture alignment, and review or approval. Example of a first version: a ticket with the label "ready for agent" and a sufficient spec gets an automatic implementation. An automated review agent reviews it. A triage agent decides if a person must also review it.

### Two types of alignment

A technical grill with the agent uncovers unknown problems. A business or architecture discussion with people creates agreement on the direction. Both are necessary, and they are different steps. We experiment with visual grilling: the agent shows each question with context and diagrams, so decisions cost less mental effort.

### Building blocks are not enough

DAM gives the building blocks. We must also give users a way to apply them to real problems. Start the story from the audience, not from the technology. The chain is: audience, then pain points and opportunities, then features, then building blocks. Describe each step in a way that is easy to consume.

### We are the first customer

We should build our own software factory on DAM. This shows us which building blocks are missing. A GitHub integration ticket already exists on the platform side.
