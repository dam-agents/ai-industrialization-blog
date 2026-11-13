---
title: "Agent isolation"
tag: Agent infrastructure
status: idea
proposed_by: Samantha Dempsey
proposed_on: 2026-11-13
authors: "Jan Pokorny"
publish_date:
related_note: "Overlaps 'Secure AI agents in enterprise' (also Jan Pokorny). Rosso is doing relevant agent-runtime work and could co-write (see 2026-10-16 committee notes)."
---

Agents used to run one agent per sandbox, one pod in Kubernetes. Now each user gets one box with several agents inside that share resources and can run whole software stacks. Why we made the change, why we chose this architecture over Google's open-source approach (performance and scalability), the biggest problems along the way (told through an architectural metaphor, not deep technical detail), and the blast radius if an agent breaks free.
