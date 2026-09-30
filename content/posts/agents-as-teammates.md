---
lede: "What happened when our team moved its AI agents off our individual laptops and into Slack."
sections: Solving lost context | Humans and agents in Slack | Benefits | Evidence from a field experiment | Tips to build your own | Get started
read_time: 4 min read
draft_url: "https://ibm.ent.box.com/notes/2493462551765"
---

We’ve all had the frustrating experience of being in the zone and then feeling like we’ve broken our stride when we need to use an AI tool. We need to open a new window, explain to the AI why and how we’re doing this task, and eventually paste what we’ve made back into the tool where our teammates are working and explain what we’ve done. These bumpy connections between our tools, other humans, and AI interfaces force us to change our ways of working to loop in AI. What if there was a way to bring AI into the tools and collaboration spaces where we’re already working with each other?

## 01 — Solving lost context, long explanations, and task switching with agent teammates

Our AI Industrialization team brought custom agents into our Slack channels using DAM, which enabled them to become full-fledged agent teammates. An agent teammate is more than just a chatbot in Slack. It hears the discussion, knows who does what, and acts with the team's tools. We’ve found that three aspects are needed for an agent teammate to integrate itself in our team's work:

- Full read and write access to our Slack discussions
- Knowledge of human team members’ roles and responsibilities
- Access to the tools like GitHub where we track and do our work

<figure class="post-figure fig-needs" aria-label="The three things an agent teammate needs, and where each lives in DAM">
  <div class="fn-grid">
    <div class="fn-cell">
      <div class="fn-key">HEARS</div>
      <div class="fn-lead">Full read and write access to our Slack discussions</div>
      <div class="fn-notes">
        <div class="fn-note"><span class="fn-dot"></span>#design, #eng, #outreach</div>
        <div class="fn-note"><span class="fn-dot"></span>Reads whole threads</div>
      </div>
    </div>
    <div class="fn-cell">
      <div class="fn-key">KNOWS</div>
      <div class="fn-lead">Human team members&rsquo; roles and responsibilities</div>
      <div class="fn-notes">
        <div class="fn-note"><span class="fn-dot"></span>Designer, developer, PM</div>
        <div class="fn-note"><span class="fn-dot"></span>Who owns what</div>
      </div>
    </div>
    <div class="fn-cell">
      <div class="fn-key">ACTS</div>
      <div class="fn-lead">Access to tools like GitHub where we track and do our work</div>
      <div class="fn-notes">
        <div class="fn-note"><span class="fn-dot"></span>Searches and files issues</div>
        <div class="fn-note"><span class="fn-dot"></span>Follows team format</div>
      </div>
    </div>
  </div>
  <div class="fn-wire">
    <span class="fn-wire-label">HOW DAM WIRES IT</span>
    <div class="fn-flow">
      <div class="fn-pair">
        <span class="fn-node"><span class="fn-step">1 &rarr;</span>Slack channel</span>
        <span class="fn-node"><span class="fn-step">2 &rarr;</span>DAM gateway<span class="fn-sub">credentials, network exit</span></span>
      </div>
      <div class="fn-pair">
        <span class="fn-node fn-node-active"><span class="fn-step fn-step-active">3 &rarr;</span>Sandboxed agent<span class="fn-sub fn-sub-active">skills, memory, workspace</span></span>
        <span class="fn-node"><span class="fn-step">4</span>GitHub</span>
      </div>
    </div>
  </div>
  <figcaption>Fig. 1 &mdash; The three things an agent teammate needs, and where each lives in DAM. Agents run in isolated sandboxes; the paired gateway injects credentials and is the only network exit.</figcaption>
</figure>

## 02 — Humans and agent teammates collaborating in Slack

To illustrate what this looks like in practice, we’d like to introduce DAMitha, our team’s custom design agent that we interact with in Slack. This is what a typical experience with DAMitha looks like: Our designer uncovers a UI issue and posts about it in our design Slack channel. One of our developers responds with information about the technical underpinnings of that issue, and a PM chimes in with an idea for how to fix it. The designer (or anyone in the channel) types "@DAMitha write an issue for this", prompting DAMitha to read the thread, check GitHub for related issues, and file an issue translating all this rich context into concise text following our team’s format.

No context is lost between tools, no human focus is disrupted, and there’s no need to explain to the agent what’s going on before it takes work off our plates. DAMitha is one of several agent teammates our team has built to support specific tasks, and tagging them into our conversations has become a routine part of the day.

<figure class="post-figure fig-thread" aria-label="Example: a four-message thread becomes a structured issue">
  <div class="ft-grid">
    <div class="ft-panel">
      <div class="ft-head"><span class="ft-head-name">#design</span><span class="ft-head-meta">Thread &middot; 4 replies</span></div>
      <div class="ft-body">
        <div class="ft-msg"><span class="ft-avatar ft-av-ds">DS</span><div><div class="ft-who">Designer <span class="ft-time">10:02</span></div>The agent list truncates long names on narrow windows &mdash; you can&rsquo;t tell instances apart.</div></div>
        <div class="ft-msg"><span class="ft-avatar ft-av-dv">DV</span><div><div class="ft-who">Developer <span class="ft-time">10:05</span></div>Sidebar is fixed at 240px and the name cell has no min-width, so it collapses first.</div></div>
        <div class="ft-msg"><span class="ft-avatar ft-av-pm">PM</span><div><div class="ft-who">PM <span class="ft-time">10:07</span></div>Could we show the full name on hover and truncate the middle instead?</div></div>
        <div class="ft-msg"><span class="ft-avatar ft-av-ds">DS</span><div><div class="ft-who">Designer <span class="ft-time">10:08</span></div><span class="ft-mention">@DAMitha</span> write an issue for this</div></div>
        <div class="ft-msg ft-msg-agent"><span class="ft-avatar ft-av-agent">D</span><div class="ft-agent-body"><div class="ft-who">DAMitha <span class="ft-tag">AGENT</span> <span class="ft-time">10:08</span></div>
          <div class="ft-checks">
            <span>&check; Read thread (4 messages)</span>
            <span>&check; Searched GitHub, 1 related, 0 duplicates</span>
            <span>&check; Filed in team format</span>
          </div>
          Filed <a href="#fig2-issue">#1482</a> and linked it to #1391.</div></div>
      </div>
    </div>
    <div class="ft-panel" id="fig2-issue">
      <div class="ft-head"><span class="ft-head-name">GitHub &middot; Issue #1482</span><span class="ft-head-open">&#9679; Open</span></div>
      <div class="ft-body ft-issue">
        <div class="ft-issue-title">Agent list truncates long instance names on narrow viewports</div>
        <div class="ft-labels"><span class="ft-label">ui</span><span class="ft-label">design</span><span class="ft-label">sidebar</span></div>
        <div><div class="ft-field">PROBLEM</div>Long instance names are cut off at narrow widths, so users can&rsquo;t tell agents apart.</div>
        <div><div class="ft-field">CAUSE</div>Sidebar fixed at 240px; name cell has no min-width and collapses first.</div>
        <div><div class="ft-field">PROPOSED FIX</div>Middle-truncate names and show the full name on hover.</div>
        <div><div class="ft-field">RELATED</div>#1391 Sidebar layout at small breakpoints</div>
        <div class="ft-issue-foot">Opened by DAMitha from a thread in #design</div>
      </div>
    </div>
  </div>
  <figcaption>Fig. 2 &mdash; Example: a four-message thread becomes a structured issue without anyone leaving Slack.</figcaption>
</figure>

> One of the biggest unlocks for us was the integration with Slack. Being able to treat agents like you do other people. Invite them to the channel, tag them in when they're relevant, or even have them listen in on our conversation.
> — Jenna Winkler, Product Manager for DAM

## 03 — Benefits of agent teammates

We’ve seen three key benefits from agent teammates like DAMitha:

- Everyone’s tickets are structured the same way and meet the same quality standard. DAMitha enables everyone to file a well-structured issue regardless of training or experience.
- Tickets can be filed immediately, even mid-conversation, while details are fresh and without breaking humans’ focus.
- Duplicate issue filings are reduced. Agent teammates check whether similar issues already exist before filing, a step that people usually skip.

> It's a small thing, but it's a great enabler.
> — Matous Havlena, Tech Lead for DAM

Without the agent, a busy person in Slack might file a title and nothing else. Overall, our agent teammates are filing issues as good as, if not better than, their human counterparts.

## 04 — Evidence from a field experiment

Our experience is anecdotal, but a recent HBS study gives rigor to what we’ve been witnessing firsthand. In a randomized controlled trial, 776 professionals at Procter & Gamble worked through a simulated product development task. Teams working with AI were significantly more likely to produce top-tier solutions than teams without AI or individuals using AI alone. They also finished 12–16% faster than the groups without AI.

![Bar chart: share of solutions in the top 10% for quality, by treatment, with standard errors. Individual, no AI: 5.1%. Team, no AI: 8.7%. Individual with AI: 7.7%. Team with AI: 15.1%.](images/agents-as-teammates-top10-quality.png)
Source: Dell’Acqua, Ayoubi, Lifshitz, Sadun, Mollick et al., *The Cybernetic Teammate* (HBS working paper, 2025). Also reported in [One Useful Thing](https://www.oneusefulthing.org/p/the-cybernetic-teammate).

## 05 — Tips to build your own agent teammates

If you’re ready to bring agent teammates into your own workspaces, we have some tips to get you started:

- Invite agents to the channels where your team works. Let them listen, so no one has to summarize the conversation for a bot.
- Assign agent teammates the work nobody volunteers for: filing issues, logging outreach, finding speakers.
- Encode individual expertise as skills, allowing the entire team to be as good as your most skilled person. Our prototyper skill lets non-designers build prototypes on our design system, and a user research skill allows anyone to write questions that aren't leading.
- Collaborate with agent teammates in open channels. Our team learned what was possible by watching how other human team members interacted with agent team members.
- Keep a human in the loop where it counts. People set goals, values, and process. Agents keep the structure running.

<figure class="post-figure fig-skills" aria-label="Skills turn one person's expertise into something every teammate can use">
  <div class="fs-grid">
    <div class="fs-cell fs-cell-expert">
      <span class="fs-key">EXPERT</span>
      <span class="fs-item">Designer&rsquo;s prototyping know-how</span>
      <span class="fs-item">Researcher&rsquo;s interview craft</span>
    </div>
    <div class="fs-cell fs-cell-skill">
      <span class="fs-key fs-key-skill">SKILL, IN GIT</span>
      <span class="fs-mono">prototyper</span>
      <span class="fs-mono">user-research</span>
    </div>
    <div class="fs-cell fs-cell-team">
      <span class="fs-key">ANYONE ON THE TEAM</span>
      <span class="fs-item">Builds prototypes on the design system</span>
      <span class="fs-item">Writes questions that aren&rsquo;t leading</span>
    </div>
  </div>
  <figcaption>Fig. 3 &mdash; Skills turn one person&rsquo;s expertise into something every teammate, human or agent, can use.</figcaption>
</figure>

## 06 — Get started

- Invite one agent to a channel, the way you'd add a person. :: /invite @DAMitha
- Give it one chore nobody wants. :: @DAMitha draft an issue based on the thread
- Turn one expert's know-how into a skill. :: @DAMitha turn our prototyping steps into a reusable skill

Then watch what your team learns from each other.

*This post draws on an interview with Jenna Winkler and Matous Havlena.*
