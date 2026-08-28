---
date: "2026-08-28"
source: meetings/ai-fridays/2026-08-28-ai-fridays-agent-driven-performance.md
---

# Key Takeaways: Agent-Driven Performance Debugging

1. **Stop guessing, let the agent measure.** When a system feels slow, people jump to quick conclusions ("it's Kubernetes", "the architecture is broken"). An agent with read-only access to the cluster, logs, and telemetry can measure exactly where the time goes in minutes. This breaks the guessing culture.

2. **The biggest wins came from access, not code.** We created a read-only Kubernetes account for the agent. It read logs, connected to the metrics stack, and reconstructed what happened at each moment. It could also distinguish noise (a deploy in progress, an image pull) from real problems.

3. **Concrete results.** The agent found an init container that spent 18 seconds creating symlinks for certificates on every start. It removed the container completely and verified the fix with its own measurements. The container image also shrank to half its size. A slow session-loading problem traced back to a bug in an upstream package — the agent found the open GitHub issue online, and a version bump fixed it.

4. **Measure in the real environment.** Locally the agent starts in 10 seconds; in the real infrastructure it took up to 90. You cannot debug a problem where it does not exist. Give the agent access to the environment where the slowness lives.

5. **A precise breakdown changes prioritization.** Startup time was the sum of many parts a human would not think to measure separately. Engineers are trained to over-optimize algorithms and data structures, but the real cost is usually in network latency or architecture. Exact numbers show what is worth fixing — and what threshold is already good enough for users.

6. **Agents replicate your existing patterns.** An early polling pattern (fetch lists every few seconds) had spread through all components because agents follow the architecture they see. It cost seconds of responsiveness. We are now moving to push-based mechanisms (websockets, subscriptions).

7. **Benchmarks are almost free — build a suite.** The agent wrote a benchmark package to re-measure after each PR. Once told "measure everything," it ran a whole epic itself: it opened ~30 issues, measured before and after each change, set a numeric threshold for "mergeable," and the automated review blocked merges until the threshold was met.

8. **Synthetic test data is trivial now.** Instead of manually clicking to reproduce a state, the agent generates realistic demo data (for example, a conversation hundreds of pages long) and loads it, ready to test in minutes.

9. **Decisions yes, actions no.** The right boundary: an agent may ask a human for a decision, never for an action. The moment an agent says "run this command and send me the output," people give up. Give the agent direct access so it can act itself (in dev, not production).

10. **This generalizes beyond performance.** Agents are excellent at digging through data volumes no human can process — telemetry, logs, usage data. Much of the data we already collect is underused; the same approach can answer questions like how users actually behave in the product.

**Caveat:** agents sometimes jump to a conclusion that is visible in the data but wrong in context, so a human still needs to steer occasionally — and model choice matters, though people only notice the model when it fails.
