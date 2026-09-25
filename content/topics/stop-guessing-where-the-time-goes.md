---
title: "Stop guessing where the time goes"
tag: Observability
status: idea
proposed_by: Matous Havlena
proposed_on: 2026-08-28
authors:
publish_date:
source_note: "content/notes/2026-08-28-agent-driven-performance-key-takeaways.md — key takeaways from the 2026-08-28 AI Fridays session, supplied by the proposer with this idea."
proposer_offer: "Matous Havlena, 2026-08-28: offered a session with the buginator agent for whoever writes this. Buginator itself is not a DAM feature yet — hoped for, not shipped."
---

What agents are unreasonably good at is digging through data volumes no human will ever read — logs, traces, telemetry, cluster state, usage data — and coming back with a number instead of an opinion. The worked example is buginator: an agent given production system logs, traces, telemetry, `kubectl` access and the underlying code, used to fix the class of bug that never reproduces on a developer's laptop. In one case it watched a failure happen and prepared the hotfix on its own.

The argument the session kept landing on: the wins came from access, not from cleverness. A read-only Kubernetes account was enough for the agent to reconstruct what happened minute by minute, and to tell real problems apart from noise like an in-flight deploy or an image pull. It found an init container spending 18 seconds per start creating certificate symlinks, removed it, and verified the fix with its own measurements — the image halved in size as a side effect. A slow session load traced to an upstream package bug the agent found as an open GitHub issue; a version bump fixed it. Locally the thing started in 10 seconds and in real infrastructure took 90, which is the whole point about measuring where the slowness actually lives.

Also worth the space: exact breakdowns change what you prioritise, because engineers are trained to optimise algorithms when the cost is usually network or architecture. Agents replicate the patterns they see — an early polling pattern spread through every component because that was the architecture on offer, and it cost seconds of responsiveness. Benchmarks became nearly free: the agent wrote a benchmark package, then ran a whole epic itself, opening ~30 issues, measuring before and after each change, and setting a numeric threshold that blocked merges until met. Synthetic test data stopped being a chore. And the boundary that made it work: an agent may ask a human for a decision, never for an action — the moment it says "run this and paste the output," people give up.

The honest caveats belong in the post too. Agents sometimes reach a conclusion that is visible in the data and wrong in context, so a human still steers. Direct-access-and-act stays in dev, not production. Natural extensions to argue for rather than claim: e2e testing production applications, simulated load and user interactions to surface problems early, and pairing this with the other agents in the software factory.
