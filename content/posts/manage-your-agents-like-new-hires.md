---
lede: "As agents join our Slack channels, the skills that matter most are the ones good managers already have."
sections: Agents are joining the team | Onboard it | Brief it | Give it one job and the right access | Delegate, then check | Give feedback that sticks | Ask or enforce | Get started
read_time: 4 min read
---

Agents now sit in the same Slack channels as the rest of us. They get tagged in threads, post updates and pick up work. Yet most of us still approach them the way we approach software. When does that habit help, and when does it get in the way?

## 01 — Agents are joining the team, and we're still treating them like software

Every tool we've used taught us the same routine: find the setting, read the docs, wait for the feature. With agents, the simpler route is often to tell the agent what you want, the way you'd tell a colleague.

The skills that work are management skills: onboarding, briefing, scoping access, delegating and giving feedback. Most of us already have them. Here are the habits that have worked best for our team.

<figure class="post-figure fig-hire" aria-label="Five everyday moments with an agent, handled as software and as a new hire">
  <div class="fh-grid">
    <div class="fh-head fh-head-sw"><span class="fh-key">TREATED LIKE SOFTWARE</span><span class="fh-lead">Look for the setting</span></div>
    <div class="fh-head fh-head-hire"><span class="fh-key fh-key-hire">MANAGED LIKE A NEW HIRE</span><span class="fh-lead">Tell it, the way you&rsquo;d tell a colleague</span></div>
    <div class="fh-cell fh-sw">Search for a settings page</div><div class="fh-cell fh-hire"><span class="fh-dot"></span><span><strong>Onboard</strong> it: have it save the rule</span></div>
    <div class="fh-cell fh-sw">Assume it read the whole channel</div><div class="fh-cell fh-hire"><span class="fh-dot"></span><span><strong>Brief</strong> it: give it the context it lacks</span></div>
    <div class="fh-cell fh-sw">Give one agent every job and all your access</div><div class="fh-cell fh-hire"><span class="fh-dot"></span><span><strong>Scope</strong> it: one job, only the access it needs</span></div>
    <div class="fh-cell fh-sw">Prompt, wait, prompt again</div><div class="fh-cell fh-hire"><span class="fh-dot"></span><span><strong>Delegate</strong> the whole job, then check</span></div>
    <div class="fh-cell fh-sw">Rewrite the output yourself</div><div class="fh-cell fh-hire"><span class="fh-dot"></span><span><strong>Coach</strong> it: say why, save the lesson</span></div>
  </div>
  <figcaption>Fig. 1 &mdash; The same five moments, handled as software and as a new hire.</figcaption>
</figure>

## 02 — Onboard it: teach it how your team works

Most agents read an instruction file, usually `AGENTS.md` or `CLAUDE.md`, at the start of every session, and they can edit it themselves.

- **Correct it like a colleague, then have it write the rule down.** "Keep updates to three bullets. Save that rule in your AGENTS.md."
- **Use the file for role, style and lessons.** Who it works for, how your team writes, and whatever went wrong yesterday.
- **Ask before you search for a button.** Cloning a repository, watching a channel or publishing a report is usually one request.

A new hire remembers yesterday. An agent remembers only what's written down.

## 03 — Brief it: it only knows what it's been told

An agent sees what it's handed, and that depends on where you ask. In a typical Slack setup:

- **Tagged in a thread:** it sees that thread only.
- **Tagged at the top level of a channel:** it sees a window of recent messages.
- **Connected to your Slack account:** it can read anything you can.

Ask for a channel summary from inside a thread and you'll get a summary of the thread. Before you judge an answer, check what the agent actually had to work with.

<figure class="post-figure fig-sees" aria-label="What an agent sees depends on where you ask: a thread, inside a channel, inside your Slack account">
  <div class="fse-grid">
    <div class="fse-nest">
      <div class="fse-box fse-acct"><span class="fse-lbl">YOUR SLACK ACCOUNT &middot; everything you can read</span>
        <span class="fse-bar" style="width:55%"></span><span class="fse-bar" style="width:38%"></span>
        <div class="fse-box fse-chan"><span class="fse-lbl">ONE CHANNEL &middot; recent top-level messages</span>
          <span class="fse-bar" style="width:60%"></span><span class="fse-bar" style="width:44%"></span>
          <div class="fse-box fse-thread"><span class="fse-lbl">ONE THREAD</span>
            <span class="fse-bar" style="width:66%"></span><span class="fse-bar" style="width:50%"></span><span class="fse-bar" style="width:34%"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="fse-legend">
      <div><span class="fse-k">TAGGED IN A THREAD</span><span class="fse-t">Sees that thread</span><span class="fse-s">Nothing else in the channel</span></div>
      <div><span class="fse-k">TAGGED IN THE CHANNEL</span><span class="fse-t">Sees recent messages</span><span class="fse-s">Not the replies inside threads</span></div>
      <div><span class="fse-k">CONNECTED TO YOUR ACCOUNT</span><span class="fse-t">Sees what you see</span><span class="fse-s">Keep this agent private to you</span></div>
    </div>
  </div>
  <figcaption>Fig. 2 &mdash; What an agent sees depends on where you ask. Ask for a channel summary from inside a thread, and you get a summary of the thread.</figcaption>
</figure>

## 04 — Give it one job and the right access

An agent with five jobs does each one worse, and needs more access than any one job requires. And an agent that uses your account *is* you to everyone else.

Slack is where this most often goes wrong. Teams want an agent that answers people in the channel and one that reads widely to build summaries. If one agent does both, it holds one person's account in a shared channel, and anyone there can ask it to read that person's messages or post in their name. Make those two agents:

<figure class="post-figure fig-split" aria-label="Two agents: a channel agent with team access, and a private reading agent with your account that publishes reports">
  <div class="fsp-grid">
    <div class="fsp-cell fsp-shared">
      <span class="fsp-key">IN THE TEAM CHANNEL</span>
      <span class="fsp-lead">Channel agent</span>
      <span class="fsp-row"><span class="fsp-dot"></span>Answers anyone in the channel</span>
      <span class="fsp-row"><span class="fsp-dot"></span>Holds only what the team shares</span>
      <span class="fsp-row"><span class="fsp-dot"></span>Posts as a bot</span>
    </div>
    <div class="fsp-flow"><span class="fsp-arrow" aria-hidden="true"></span><span class="fsp-flow-lbl">reports</span><span class="fsp-flow-sub">never access</span></div>
    <div class="fsp-cell fsp-private">
      <span class="fsp-key fsp-key-private">PRIVATE TO YOU</span>
      <span class="fsp-lead">Reading agent</span>
      <span class="fsp-row"><span class="fsp-dot fsp-dot-private"></span>Uses your Slack account</span>
      <span class="fsp-row"><span class="fsp-dot fsp-dot-private"></span>Talks only to you, one-on-one</span>
      <span class="fsp-row"><span class="fsp-dot fsp-dot-private"></span>Publishes summaries the channel agent can read</span>
    </div>
  </div>
  <figcaption>Fig. 3 &mdash; One job per agent. The agent that holds your account never sits in a shared channel; what it learns travels as a report, not as access.</figcaption>
</figure>

You wouldn't give a new hire your password. An agent in a group chat shouldn't have it either.

## 05 — Delegate whole jobs, then check the work

Prompt, wait, read, prompt again is micromanagement. Hand over the whole job instead: "Every weekday at 9am, summarize what changed in this repo and post it here." Then keep a light touch:

- **Ask for silence on quiet days,** so its posts keep meaning something.
- **Have it log every run.** A job that fails silently looks the same as a quiet day.
- **Check the spend** after the first real week, before adding more schedules.
- **Check what data your platform is cleared for** before giving an agent anything sensitive.

## 06 — Give feedback that sticks

- **Say why, not just what.** "This isn't working" gets a reworded draft. "The point is that we need to step back, not that the design is wrong" gets a better one.
- **Save the lesson.** After a round of back and forth, have the agent write what it learned into its instruction file or a skill, a packaged set of instructions for one kind of task. Then everyone who uses that agent benefits.

## 07 — Ask or enforce: know which rules are requests and which are walls

This is where the new-hire analogy breaks, and it's the distinction that matters most.

- **Requests** are instruction files, skills and corrections in chat. The agent follows them most of the time, but they're only words, so other words can override them: a vague prompt, a long conversation, or text planted in a web page or shared document. A colleague can tell their manager's request from a strange line in a stranger's email. An agent can't, reliably.
- **Walls** are permissions, credentials you never hand over, network rules and approval steps. They hold whatever the agent reads, because the agent can't change them.

To choose, ask what happens if the agent ignores the rule once:

- **"That's annoying"** → ask for it. Tone, format, process, templates, who to tag.
- **"That's harmful, or I can't undo it"** → enforce it. Posting as you, sending data out, deleting things, spending money, touching production.

Be most careful with an agent that reads content others can write, reaches private data *and* can send things out. Take one of those away with a wall.

<figure class="post-figure fig-wall" aria-label="The test: what happens if the agent ignores this rule once? Annoying means ask for it; harmful means enforce it">
  <div class="fw-q"><span class="fw-key">THE TEST</span><span class="fw-qtext">What happens if the agent ignores this rule once?</span></div>
  <div class="fw-grid">
    <div class="fw-cell">
      <span class="fw-ans">&ldquo;That&rsquo;s annoying.&rdquo;</span>
      <span class="fw-verb">Ask for it</span>
      <span class="fw-how">A <strong>request</strong>: instruction file, skill, a correction in chat. Followed most of the time, and other words can override it.</span>
      <span class="fw-row"><span class="fw-dot"></span>Tone and format</span>
      <span class="fw-row"><span class="fw-dot"></span>Process and templates</span>
      <span class="fw-row"><span class="fw-dot"></span>Who to tag</span>
    </div>
    <div class="fw-cell fw-cell-wall">
      <span class="fw-ans">&ldquo;That&rsquo;s harmful, or I can&rsquo;t undo it.&rdquo;</span>
      <span class="fw-verb fw-verb-wall">Enforce it</span>
      <span class="fw-how">A <strong>wall</strong>: permissions, access never handed over, network rules, approval steps. Holds whatever the agent reads.</span>
      <span class="fw-row"><span class="fw-dot fw-dot-wall"></span>Posting as you</span>
      <span class="fw-row"><span class="fw-dot fw-dot-wall"></span>Sending data out</span>
      <span class="fw-row"><span class="fw-dot fw-dot-wall"></span>Deleting, spending, touching production</span>
    </div>
  </div>
  <div class="fw-foot"><strong>The common mistake:</strong> &ldquo;never do X&rdquo; in the instruction file and nothing else. That&rsquo;s a request dressed up as a wall.</div>
  <figcaption>Fig. 4 &mdash; Requests shape how the work gets done. Walls stop what must never happen.</figcaption>
</figure>

So keep the "never do X" in the instruction file, then build what actually stops it. On DAM, our team's platform, the walls live in the platform, not the prompt: each agent can only reach the sites and connections its owner approved, and never sees the real keys.

## 08 — Get started

- Give your agent its first rule, the way you'd correct a colleague. :: Keep updates to three bullets, and save that rule in your AGENTS.md
- Hand it a whole job, not a single step. :: Every weekday at 9am, summarize what changed in this repo and post it here
- Check which of its rules are walls. :: List every rule in your AGENTS.md that would cause harm if you ignored it once, and tell me what actually stops you

Agents will keep joining our channels. The biggest gain won't come from better models. It'll come from managing agents with the skills we already use on each other.
