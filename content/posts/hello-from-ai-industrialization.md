---
lede: "Our first post. Why we exist, how we work, and what we are still learning."
sections: Why we exist | How we work | What we are building | Questions we are exploring | What you'll read here
read_time: 5 min read
draft_url: "https://ibm.ent.box.com/notes/2448439475984"
---

The hard part of AI research isn't just making something work. It's figuring out whether it's worth building, who needs it, and what it takes to make it work beyond the demo.

We're IBM Research's proving ground for emerging AI, a cross-functional team in the AI Platform Research pillar. We work at the front edge of AI research, where the technology is changing faster than the product can be specified. We turn emerging ideas into things people can actually try, then use what we learn to help decide what should be built, changed, or stopped.

We work alongside researchers, not after the research is done. We identify the assumptions behind an idea, test the riskiest ones early, and turn what we learn into better decisions about where the work should go next.

We're practitioners as much as we are evaluators. We build, use, and iterate on real systems while the questions are still open.

This is our first post.

## 01 — Why we exist

Getting something to work is only the first step. The harder questions are whether it solves a real problem, who would use it, and what would have to be true for it to work outside the research environment.

Those questions often get answered late. Something gets built, people try it, and only then does someone discover the underlying assumption was wrong. We want to find that out earlier. We work with researchers to identify the assumptions that matter most, test them with real users and workloads, and use what we learn to decide where the work should go next.

Sometimes the answer is that an idea needs to change. Sometimes we find that a problem is different than we thought. Sometimes we learn that something isn't worth pursuing. All of those are useful outcomes.

We also look at where the work fits with the problems IBM is trying to solve. We're trying to understand not just whether something can work, but whether there's a reason to keep investing in it.

We'd rather learn we're wrong this week than prove it six months from now. What we learn feeds directly into how IBM Research thinks about building and deploying AI at scale.

We build the minimum needed to make an idea real enough to experience, then we're willing to pivot quickly when the evidence tells us to.

## 02 — How we work

We start by trying to understand the problem. We validate our assumptions about what researchers need by talking to them and watching them work. That helps us form a hypothesis about the problem. We then put something concrete in front of users to see what holds up, what breaks, and where we were wrong. That first artifact might be an interview, a study, a flow board, or a coded prototype of something that doesn't exist yet. The point is to make the idea concrete enough to challenge before we spend months building it.

A few principles guide us:

- **Learn before we build:** the goal isn't to build as fast as possible, it's to find out as fast as possible whether something is worth building.
- **Start small:** build just enough to answer the question in front of us, then stop or change direction once we have the answer.
- **Stay close to users:** decisions should come from real needs and real use, not from guesses about what people might want.

We use what we build. That shows us what works, what's missing, and where our assumptions are wrong. Sometimes we rip out things we were sure we needed. That's a healthy sign, not a failure. If we're doing research right, it should change our minds.

## 03 — What we are building

Our work sits where research ideas meet real use. That can mean a product experience, an agent platform, or the infrastructure underneath it.

DAM is the biggest example of this work right now: an open source platform for running long-lived AI agents. It gives us a real system to learn from as we explore what researchers need when agents work over days and weeks, not just a single interaction.

We also work on the systems underneath these experiences, including model inference and serving. The questions there are different but connected. What makes an AI system practical to run? What do cost and performance mean for agentic workloads? What infrastructure do researchers need to experiment?

The projects will change. The questions probably won't. What ties the work together is using real systems to answer questions that are still open.

## 04 — Questions we are exploring

These are some of the questions we're exploring right now.

### Where is the line between agents and platform?

An agent can do a lot on its own. So what belongs inside the agent, and what should the platform handle? We're exploring that boundary as DAM grows beyond simply giving an agent a place to run. Experiments are one example: today, much of the loop and evaluation still happens inside the agent. We're interested in what changes when the platform takes on more of that work.

### Do agents get better with more context, or eventually hit a point where more becomes too much?

Keeping an agent running longer gives it more history, but more history isn't necessarily better. As context grows, useful information can become harder to find, repeated work can pile up, and the agent can lose track of what matters. We're exploring when persistence and memory help, when they start to hurt, and whether some work is better done from a clean slate.

### Is it better to have one agent that does everything, or many that each do one thing well?

Agents can now delegate work to other agents, but that doesn't mean they should. More agents can let you split up work, compare approaches, or use different models for different jobs. It can also add coordination, cost, and more places for things to go wrong. We're interested in when delegation actually helps and when one capable agent is enough.

### What does multiplayer look like when the thing you're sharing is an agent?

Most software is designed for people to work together directly. Agents introduce a different model: people can work alongside an agent, hand work to it, or build on work it has already done. We're exploring what collaboration looks like when an agent is shared across a team. Who can interact with it? How do people see what it has done? How do they build on each other's work? And what does it mean for an agent to become part of a team's workflow rather than belonging to one person?

### What should cost mean to an agent, not just to the person paying for it?

An agent doesn't experience cost the way a person does. It can keep working, call more tools, start more agents, and use more tokens unless something tells it to stop. We're exploring how cost should become part of an agent's decisions, rather than something the person discovers afterward in a usage report.

### How do you know an agent actually did a good job?

An agent can finish a task without actually accomplishing what you wanted. Traditional software gives us fairly direct ways to test whether something worked. Agentic work is less predictable: the output can vary, the path matters, and the right answer often depends on the task. We're exploring how to make evaluation useful for both the people building agents and the people relying on them.

## 05 — What you'll read here

This blog is field notes.

We'll write about what worked on a real workload and what didn't, decisions we still defend and decisions we've reversed, experiments and prototypes, product and design practices, and guides concrete enough for another team to follow.

We'd rather write while the questions are still open than wait until everything looks inevitable in retrospect.

Some of it will be specific to DAM. Some will be about the broader practice of building AI-native systems. The thread through both is figuring out what's worth building when the technology changes faster than the product can be specified.

We don't expect to have the answers when we start writing. That's kind of the point. The useful output won't just be the things we build. It'll be what we learn from building them: what works, what doesn't, and what the evidence tells us to do next.
