---
lede: "AI is writing more code than people can review, so developers are trading line-by-line review for systems that automate the whole development process."
sections: AI made writing code fast and reviewing it hard | An AI system that writes, reviews, tests, and ships code | The role of humans | Risk and the software factory | Building a software factory with DAM | Build your own | Developers decide how the factory runs
read_time: 8 min read
---

AI coding tools now write code faster than many teams can review it, and the developers who know a system best spend their days reading pull requests they didn't write. Many teams respond by trying to make AI write better code, but a few are asking a bigger question: what would happen if we redesign the entire system of writing, reviewing, testing, and shipping software so that AI can do it autonomously?

## 01 — AI made writing code fast and reviewing it hard

Until recently, the process of creating software has been primarily human. Human developers review issues, write code to address issues, review code, and deploy it to production. With recent advances in generative AI, many development teams are now automating the “write code” part of that process. We are now able to create code faster than ever before, and this has resulted in teams shipping more code than was previously possible. However, the downside of this increased capacity typically falls on senior developers who are responsible for reviewing code to ensure that it is safe to ship to production. These developers are swamped by the amount of code that requires human review. A recent study by LinearB found that pull requests written with AI assistance are 2.6 times larger than non-assisted pull requests [1]. In many cases, the increased volume of pull requests has outgrown teams’ reviewing capacity. The bottleneck has shifted from creating code to proving that it is ready to ship.

This bottleneck has led to some teams shipping code that has never been reviewed. A study by Faros AI recently found that when development teams had high AI adoption, they merged unreviewed code 31% more often than when those same teams had a low AI adoption. This increase in unreviewed code was associated with a 58% rise in production incidents and a 54% rise in bugs per developer [2]. If this trend continues, the pressure to ship more code faster may continue to overcome the need for review, leading to lower quality code and higher risk of unreliability in the tools and systems we all rely on.

This overwhelm also has a human cost for the developers who seek to maintain human review in the face of this code deluge. A recent DORA study found that “the time saved [by developers] during initial code or content generation is often re-allocated to verification overhead… Verification is a fundamentally different cognitive task than creation" [3]. The same study found that "velocity gains for an individual author frequently translate into a significantly increased cognitive load for the reviewer" [3]. The most experienced developers are spending more time reviewing AI-generated code which, in our experience, is less satisfying work than writing it.

As teams see more incidents and bugs, and reviewers carry more of the load, some developers are questioning the entire process by which we create quality and safe software. Rather than inserting AI into one step of a system that was designed for humans, they ask how we might design an entirely AI-native system to create software.

## 02 — An AI system that writes, reviews, tests, and ships code

Redesigning the software creation system encompasses more than simply finding ways to generate better code. Developers are widening their focus to ask how AI can autonomously drive the process of writing, reviewing, and shipping code. This shift from inserting AI into one part of the process to designing an AI system that outputs quality and safe code is captured by Zach Lloyd, CEO of Warp, predicting that “software engineering will become factory engineering” [4]. This vision, often referred to as a “software factory” represents a shift in the way that developers conceive of their profession. Traditionally, developers have been responsible for creating code. In a software factory model, developers are responsible for creating the AI-powered system that generates, tests, and deploys code itself.

In this system, developers’ primary focus is on designing, improving, and maintaining the AI-powered system, i.e. the software factory. The software factory is an agentic system orchestrating multiple agents. These agents monitor production, report incidents, and write issues for bugs that need to be fixed. Another set of agents implement bug reports, review generated code, and ship that code. All these agents work in automated loops with limited human intervention. This autonomy requires the development of a robust suite of testing criteria and agents to run that testing reliably. Once the system proves that it is capable of producing quality code autonomously, developers can set agents on a task overnight and wake up to high quality pull requests that have already been automatically reviewed by an agent according to the project guidelines.

## 03 — The role of humans in the software factory

No one has yet achieved this vision of a fully automated software factory. Even as developers strive to create software factories that produce quality code without human intervention, we see several parts of the software creation process where humans will continue to play a key role in the process.

- **Designing the system**. Developers’ primary goals will be to design the system that produces quality and safe code. A key part of this work is making it possible to understand how reliable and trustworthy the system is by creating code quality checks and tests as well as capabilities to trace incidents and bugs back to agent decisions.
- **Owning key decisions.** Humans have access to incredible amounts of business, strategy, and social context that are key to defining what a product should do and become. We come by this context by existing in the world, interacting with other humans, and being part of a complex organization. In a software factory, humans will need to set a product’s direction by deciding what problems are worth solving, ensuring that success metrics align with business needs, and defining the scope of new features.
- **Providing feedback**. Humans need to define what “improvement” means so that agents can iterate autonomously in the right direction. At a strategic level, this includes defining what counts as an improvement in the system overall and providing limits through clear scoping. At an execution level, this includes pruning the branches of thought that an agent should explore and defining “better” in numbers that an agent can score its results against.
- **Determining the system’s autonomy**. Autonomy is a scale rather than a switch you flip, and humans are needed to identify the work that the software factory can be trusted to complete without human intervention. Trusting a factory to move up the scale and work more autonomously means making sure that the lowest level task is safe to run without a human and able to reliably produce quality outputs before moving onto the next level of tasks. Most of this work focuses on the environment itself, tests, checks, permissions, monitoring and recovery.

## 04 — Risk and the software factory

While there is great promise in this new approach, building a software factory isn’t the right choice for every software team. Software for high risk scenarios like operating a vehicle or for handling sensitive information like banking transactions should still be reviewed by humans. Teams working in lower risk scenarios, however, can begin to implement software factories today. Our own team, the IBM Research AI Industrialization team, is part of a group with the explicit mandate to explore applications of emerging AI technology. We have the privilege of being expected to make mistakes on software with a limited capacity for harm. We are a perfect testing ground for building and testing a software factory.

## 05 — Building a software factory with DAM

We created DAM, an open-source platform for running AI agents in the cloud that work on their own over long periods, and used it as the foundation for our own software factory. Over the last 6 months we’ve built parts of that software factory on DAM. Our biggest successes have come from using it to build and monitor the DAM platform itself.

### Code review

We built an automated suite of static checks and tests in DAM that systematically prevent critical problems like backwards incompatibility of an API schema. In addition to these static checks, we also built a Code Reviewer agent that judges the code against a set of hand-designed rules when no deterministic test is possible. A recent addition to our rules is an “issue-fit” rule that checks whether the code actually implements the task and satisfies all acceptance criteria.

### Incident investigation

We now rely on an agent in DAM to investigate telemetry and logs whenever something goes wrong. It monitors the deployment state, CI pipeline health, and some of our non-production deployments with direct access to the Kubernetes cluster. When an issue arises, it notifies us and then tracks down the root cause. It has helped us get to the bottom of an out-of-memory crash, LLM provider issues, failed releases, and a failing CI pipeline. Our team’s first step when troubleshooting an issue has become simply messaging this agent “What went wrong?” on Slack.

### User support

DAM allows users to interact with agents directly in Slack, and we’ve used this feature to launch a user support agent in our DAM community Slack channel. The agent answers questions users send in Slack and automatically files corresponding GitHub issues for bug reports and missing features. This agent has full access to our codebase, existing issues, and known bugs, so in many cases the agent will have answered the user’s question, identified the code causing the bug, and filed an issue to address it before a human team member has even seen the post.

## 06 — Build your own software factory in DAM

You can start building a software factory in DAM today. DAM is open source, so you can deploy it on your own Kubernetes cluster from [github.com/dam-agents/dam](https://github.com/dam-agents/dam). IBMers can skip the setup and sign in to the hosted version with their IBM login at [ibm.biz/dam-agents](https://ibm.biz/dam-agents). Each step below uses a starter kit, which sets up a ready-to-use agent in a few clicks.

1. **Shape your process alongside an agent.** Apply the Software Developer starter kit to one repository and work with it in interactive mode first. Hand it an issue in chat, and it writes the change, runs your tests, and opens a pull request. It can also click through the feature in a browser while you watch. Once it works the way your team does, switch it to autonomous mode.
2. **Give it a reviewer.** The Code Reviewer starter kit reviews every open pull request, including whether the change does what the issue asked. A reviewer can only hold work to a standard someone has written down, so give each issue clear acceptance criteria and your repository the tests that prove them.
3. **Test it the way a user would.** The Quality Inspector starter kit runs your newest build and works through each issue's acceptance criteria in a browser. It reports a verdict on every criterion, with video as evidence.
4. **Let it earn the merge.** Once its reviews hold up, a repository admin can let Code Reviewer merge small pull requests that a person has labeled, that it has approved, and that pass every check. Everything else stays with a person.
5. **Keep people in the loop.** Connect your agents to Slack so they can tell people when a pull request needs them. Set spending limits so a badly defined task can't run up a bill.

## 07 — Developers decide how the factory runs

As software teams start to build their own software factories, we are witnessing changes in developers’ responsibilities. The shift from developers being responsible for code to being responsible for the AI system that produces code may be disruptive, but we see it as an opportunity. Humans are moving from working on the factory line to deciding how the factory runs. That means setting the standards a change has to meet, choosing which work runs without a person, and pulling autonomy back when the factory gets something wrong. We are in the process of creating trustworthy systems that assign AI the work of code creation and review while allowing humans to focus our creative powers on defining what software to build, why, and with whom.

If you're working out what that system looks like for your team, we’d love to hear about it on GitHub Discussions at [github.com/dam-agents/dam/discussions](https://github.com/dam-agents/dam/discussions).

<ol class="post-refs">
  <li>LinearB, "2026 Software Engineering Benchmarks Report," industry report, 2026. <a href="https://linearb.io/resources/software-engineering-benchmarks-report">https://linearb.io/resources/software-engineering-benchmarks-report</a></li>
  <li>Faros AI, "AI Engineering Report 2026: The Acceleration Whiplash," industry report, 2026. <a href="https://www.faros.ai/research/ai-acceleration-whiplash">https://www.faros.ai/research/ai-acceleration-whiplash</a></li>
  <li>Jessica Baolin and Nathen Harvey, "Balancing AI Tensions: Moving from AI Adoption to Effective SDLC Use," DORA research insight, March 10, 2026. <a href="https://dora.dev/insights/balancing-ai-tensions/">https://dora.dev/insights/balancing-ai-tensions/</a></li>
  <li>Richard MacManus, "AIEWF Daily Dispatch: Loops, Software Factories &amp; Forward Deployed Engineers," Latent Space, July 1, 2026. <a href="https://www.latent.space/p/aiewf-daily-dispatch-loops">https://www.latent.space/p/aiewf-daily-dispatch-loops</a></li>
</ol>
