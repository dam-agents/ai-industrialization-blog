---
lede: "AI-native research hands the experiment loop to agents and changes the researcher’s role."
sections: From assisted to autonomous research | Superpowering individual researchers | A team of researchers and agents | DAM provides the infrastructure | Build your own experiment in DAM
read_time: 6 min read
draft_url: "https://ibm.box.com/s/67s2xrmdadbnq8xby0a1a72kfyt3zhfy"
---

AI agentic systems are becoming capable of running the scientific method on their own: they can propose a change, test it, observe the results, and decide what to try next. What does the future of experimentation look like when agents autonomously loop through the cycle of discovery, and what are the steps we can take today to bring that future closer?

Humanity’s stories of great scientific discoveries tell the tale of a human performing the scientific method. Rosalind Franklin, Louis Pasteur, and Marie Curie all created hypotheses, tested them with an experiment, interpreted the results, and revised their hypothesis. With the advent of AI-native research, human researchers are beginning to hand off parts of the process to agents who can run experiments autonomously. This kind of automation isn’t just an on-or-off switch. It’s a spectrum, and researchers everywhere are in the process of defining where they fall on it.

## 01 — From assisted research to autonomous research

Many researchers use AI to assist with everyday tasks like summarizing papers, exploring ideas, and writing code. However, the type of AI use reshaping scientific research is *automation of the experimental process itself* rather than assistance. We call the autonomous participation of AI in the research process “AI-native research”. The experimental process is one aspect of AI-native research. The scientific community is currently in the process of understanding what aspects of the research process, including the experimental process, could be automated by AI and how much autonomy they want to give the agents doing that automation.

One way to think about the experimental process is the design-build-test-learn cycle (DBTL). It describes a series of iterative loops where (traditionally) human researchers make something to test a hypothesis, observe how the thing performs during a test, and then make changes to the thing based on their observations. When run by humans, this process is very hands-on and takes significant time. However, due to recent advancements, agents now have the potential to eventually automate every part of that process. As the technology progresses, it’s up to researchers to determine where and how they want to invite agents to step in.

## 02 — Superpowering individual researchers with autonomous research agents

Some individual researchers have already brought agents into every part of the experimental process. Agents have been used to help design experiments, build proposed solutions, test them, and use the findings to inform the next round of iteration. Projects such as Andrej Karpathy’s autoresearch [1] and Google DeepMind’s AlphaEvolve [2][3] offer early examples of AI-native research frameworks that can propose changes, test them, and use the results to guide another round of experiments with limited human intervention. Researchers adopting these systems are able to set a direction for an experiment, leave an agent exploring possible solutions overnight, and return to findings that shape the next day’s work.

As researchers begin delegating more of the process to AI agents, their role shifts from building experimental infrastructure and executing every step to instead steering the work and designing the systems in which the agents can loop through the design-build-test-learn cycle autonomously. With less time spent on routine execution, researchers can devote more attention to deciding what to investigate, interpreting the results, and working with others to move the research forward. Where a result requires human judgment, researchers can opt to stay in the loop for that step.

Different parts of the experimental process have the potential to reach different levels of AI automation and autonomy. The need for human oversight and qualitative decision-making determines how much autonomy an agent can be given. For example, experiments that require a human’s judgment to decide which output is better lack a quantitative evaluation metric. An agent won’t be able to evaluate results without this quantifiable definition of what “better” means. This breaks the loop and decreases an agent’s ability to work autonomously. Additionally, agents can only evaluate what they can see, so the entire system needs to be visible to agents in order for them to run the design-build-test-learn cycle without relying on humans to close the loop.

## 03 — Creating a team of researchers and agents

Today, single researchers are utilizing autonomous agents to enhance their own closed-loop experimental processes. What might a future look like where individual experiment loops become part of a larger investigation shared by several researchers and their agents? Findings would flow between loops, allowing different researchers and their agents to turn colleagues’ results into context for their next experiment. With this increased context, agents could point to the areas that deserve more experiments, drawing on everything the team has learned. Researchers would then have a stronger basis for deciding where to steer the work next.

This workflow only becomes possible when all the team’s research is documented in one place that’s accessible to both researchers and agents. A shared knowledge base containing all experiments, results, the reasoning behind decisions, and approaches that failed would give agents the capability to avoid repeating work and to form better hypotheses. It would also allow the researchers to query the shared knowledge base to form their own understanding of the team’s previous work and how it informs larger strategy and goals.

This vision also requires that researchers and agents share a common place, like Slack, where they could interact. This needs to be visible and accessible to agents and humans alike. In this shared space, agents could report progress, ask for a decision when human judgment is required, and take direction from the team. This transparency into researchers’ real-time decision-making conversations would give agents access to up-to-date information without a human needing to explicitly upload meeting notes. These coordinated efforts would go beyond achieving individual researcher goals to furthering collective team goals.

## 04 — DAM provides the infrastructure. Researchers run the experiments.

As IBM’s AI Industrialization Team, we seek to support researchers transitioning towards this vision of AI-native automation of the experimental process. In our work, we’ve witnessed researchers come up against a set of common problems when they began to bring agents into their design-build-test-learn loops. We built [DAM](https://github.com/dam-agents/dam), IBM Research’s open source platform for running AI-native research, to address these issues so researchers can automate more of their experimental process. In DAM, an agent can autonomously run the design-build-test-learn loop round after round. It works in an isolated workspace, uses the tools the experiment needs without ever holding the credentials, starts on the schedule the researcher sets, and checks in through Slack when a result needs human judgment. A researcher can hand an agent a single step of the loop, such as testing candidate designs, or the whole cycle.

### DAM’s AI-native infrastructure

<table class="post-table">
  <tr><th scope="row">Secure sandbox</th><td>Controlled access to only the files and tools you grant.</td></tr>
  <tr><th scope="row">Persistent environment</th><td>Keeps experiment state and results across long runs, so the researcher can close their laptop and come back.</td></tr>
  <tr><th scope="row">Enforceable limits</th><td>Caps on each attempt and on overall spending (coming soon).</td></tr>
  <tr><th scope="row">Telemetry and cost gates</th><td>Shows what the agent is doing and where it fails. Repeated failures or spending without progress can pause the run for review (coming soon).</td></tr>
  <tr><th scope="row">Model interoperability</th><td>Change the model or agent tools without rebuilding the execution environment and controls.</td></tr>
</table>

DAM lets researchers run experiments without having to build their own infrastructure. Researchers can define the scientific questions, experimental methods, and evaluation criteria, and DAM helps them run that work securely, persistently, and within the limits they choose.

## 05 — Build your own AI-native experiment in DAM

Considering building your own AI-native experiment? You can do it in DAM today. DAM is open source, so you can deploy it on your own Kubernetes cluster from [github.com/dam-agents/dam](https://github.com/dam-agents/dam). IBMers can skip the setup and request access to our hosted version at [ibm.biz/dam-docs](https://ibm.biz/dam-docs).

1. **Describe your experiment.** Create an agent and tell it in chat what you want to learn, which system to test, and how to measure a better result.
2. **Let the agent build and run it.** It can clone your code, build the system, write the experiment, and run it in an isolated sandbox. Its workspace keeps code and results between sessions.
3. **Close the loop overnight.** Set a schedule to wake the agent for the next round. Ask it to keep a record of what worked, what failed, and why, so each round starts with that context.
4. **Bring in your team.** Turn those records into shared knowledge with one of DAM’s Knowledge starter kits: LLM Wiki builds a structured wiki with a knowledge graph you can question, and Plain Wiki keeps organized markdown files. Connect the agent to your team’s Slack so it can post progress and ask the team when a result needs human judgment. Publish results as DAM artifacts to share them.
5. **Share the loop.** Once it works, package it as a starter kit so your teammates can create the same agent.

You don’t have to start from scratch. DAM’s Starter Kits create a ready-to-use agent in a few clicks, for research, knowledge, software, and productivity work. Pick the Research kit whose framework fits your problem, and DAM will create an agent in an isolated sandbox with that framework installed. Then describe in chat what to improve and how to measure success. The Research kits are:

- **OpenEvolve** evolves software against a scoring function you define, generating new versions and keeping the ones that score highest.
- **AdaEvolve** optimizes code and algorithms by evolving several separate pools of candidates in parallel and shifting effort toward the most promising ones.
- **ShinkaEvolve** evolves software with fewer evaluations than a typical search, which suits problems where each test run is slow or costly.
- **GEPA** optimizes prompts, instructions, and other text by scoring each version on example tasks and having a model diagnose why the weaker ones fell short.
- **K-Search** optimizes GPU kernels, with a model proposing changes and each one evaluated on cloud GPUs through Modal.
- **Nous** runs hypothesis-driven experiments on a system you can build and measure, testing each hypothesis against controls.

We’d like to hear what you build. Share it in GitHub Discussions at [github.com/dam-agents/dam/discussions](https://github.com/dam-agents/dam/discussions).

<ol class="post-refs">
  <li>Andrej Karpathy, “autoresearch,” GitHub repository, March 2026. <a href="https://github.com/karpathy/autoresearch">https://github.com/karpathy/autoresearch</a></li>
  <li>Google DeepMind, “AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms,” Google DeepMind blog, May 14, 2025. <a href="https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/">https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/</a></li>
  <li>Alexander Novikov et al., “AlphaEvolve: A coding agent for scientific and algorithmic discovery,” arXiv:2506.13131, June 2025. <a href="https://arxiv.org/abs/2506.13131">https://arxiv.org/abs/2506.13131</a></li>
</ol>
