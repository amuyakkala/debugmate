# DebugMate 🧠
Your AI-powered debugging teammate.

[Live demo](https://tempo-deployment-93eec97a-a8ee-4e21-861c-bd0e4b7e670-darprp3hh.vercel.app/)

### ✨ Features
- 🔐 **GitHub Login via Supabase Auth**: Secure login with your GitHub account using Supabase authentication.
- 📤 **Upload Logs & Get Instant AI Insights**: Upload your system logs, and get immediate insights powered by AI to help you understand errors and bottlenecks.
- 💬 **Ask GPT-powered assistant**: Get detailed answers with a GPT-powered assistant. Ask questions like "Why is this pipeline breaking?" and receive helpful explanations.
- 📊 **Visualize Debug Timelines (MTTR)**: Track your **Mean Time to Recovery (MTTR)** with visualizations that help you understand the time it takes to resolve issues.
- 🔌 **Connect tools like GitHub, Datadog, and Sentry**: Easily connect with popular debugging and monitoring tools to get a comprehensive view of your system’s health (mock support currently).

### 🛠 Tech Stack
- **Frontend**: React (Vite) + TypeScript + TailwindCSS + shadcn/ui
- **Backend**: Supabase (Auth + DB) + Edge Functions (analyze-logs, chat-assistant)
- **AI**: OpenAI or mock GPT integration

### 🔧 Setup Instructions
1. Clone the repo
    ```bash
    git clone https://github.com/your-username/debugmate.git
    cd debugmate
    ```

2. Install dependencies and run:
    ```bash
    npm install
    npm start
    ```

### About
[debugmate.vercel.app](https://debugmate.vercel.app)

### Resources
- **Readme**  
- **Activity**

### Stats
- **Stars**: 0 stars  
- **Watchers**: 1 watching  
- **Forks**: 0 forks  
- **Releases**: No releases published  

### Suggested Workflows
Based on your tech stack:

- **Gulp**: Build a NodeJS project with npm and gulp.
- **Grunt**: Build a NodeJS project with npm and grunt.
- **SLSA Generic generator**: Generate SLSA3 provenance for your existing release workflows.

### Footer

---

### Why I Made This 🤔

**DebugMate** was born out of frustration—frustration with the amount of time developers waste on debugging complex systems, sifting through endless logs, and piecing together the story behind each issue. Debugging can often be tedious, time-consuming, and sometimes feel like a guessing game. This led me to ask: *What if there was a way to automate the process of understanding and diagnosing these issues, so developers could spend more time building and less time debugging?*

**DebugMate** was created to be that solution. It combines the power of **AI** and **machine learning** with tools we already use (like GitHub, Datadog, and Sentry) to make the debugging process faster, smarter, and more efficient. It’s designed to:

1. **AI-powered insights**: Allow developers to upload logs and instantly gain actionable insights, helping them understand exactly where their systems are failing and why.
2. **Contextual Assistance**: Provide an interactive, **GPT-powered assistant** to help diagnose issues and get answers in real-time. No more guessing—just clear, data-driven explanations of what's going wrong.
3. **Track and Improve MTTR**: Help teams visualize their **Mean Time to Recovery (MTTR)** so they can see how quickly they're resolving issues, track progress over time, and identify bottlenecks.

The future of debugging lies not just in retrieving logs and error messages, but in understanding the deeper context of each failure, anticipating where problems might arise, and acting swiftly to resolve them. **DebugMate** aims to **take the guesswork out of debugging** by using **AI** to offer **real-time, intelligent insights** that make developers’ jobs easier.

### What It Solves 💡

- **Problem 1: Time-consuming log analysis**  
  Developers often spend a significant amount of time sifting through error logs and trying to understand the root cause of issues. DebugMate automates this process with **AI-powered insights**, reducing the time needed to diagnose and fix problems.

- **Problem 2: Lack of actionable context**  
  Many logging systems only provide error codes or vague descriptions of failures, leaving developers guessing. With **GPT-powered assistance**, DebugMate offers **detailed, contextual explanations** of what’s breaking, why it’s happening, and how to fix it.

- **Problem 3: Difficulty in tracking resolution times**  
  Without a clear understanding of how long it takes to recover from failures, teams struggle to improve their MTTR. DebugMate's **visual MTTR timeline** allows teams to see how quickly they resolve issues and identify areas for improvement.

### Future Improvements 🚀

**DebugMate** is just getting started, and I have big plans for the future:

1. **Enhanced AI Integration**: As AI technologies continue to evolve, DebugMate will incorporate **more advanced machine learning models** to offer even more accurate insights and predictions about system health.
   
2. **Deeper Tool Integrations**: While DebugMate currently supports **mock integrations** with tools like GitHub, Datadog, and Sentry, I plan to enhance the integration capabilities, allowing for deeper and more seamless connections with these tools.
   
3. **Real-Time Monitoring**: Adding **live real-time monitoring** features to proactively detect issues before they become critical, giving teams even more time to act and reduce downtime.

4. **Community-driven features**: I aim to open DebugMate to contributions from the developer community, enabling others to build on top of it, add new features, and make it more robust.

### Why I Want to Continue Building This 🛠

At its core, **DebugMate** is about making debugging smarter, faster, and more efficient. But it’s also about creating a platform that can scale with the needs of developers and teams as they grow. My goal is to continue improving DebugMate, making it the go-to tool for developers who want to tackle the toughest debugging challenges with ease. If **DebugMate** can save developers just a few minutes a day, it will make a huge difference over time—and that's something I’m passionate about.

