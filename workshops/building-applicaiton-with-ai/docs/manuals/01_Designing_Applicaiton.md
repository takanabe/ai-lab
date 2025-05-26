# Chapter1: Designing application

## Relevant PRs

You can find all commits for this chapter in the following PRs.

- https://github.com/takanabe/ai-lab/pull/2 

## Overview

## What you'll do

- You will experience how to use "Plan" and "Act" in Cline.
- You will create a project structure, coding policy, and tasks as markdown files.
- You will share the markdown files as our application contexts with AI Agent.

## 1-1: Designing project structure

Run the following prompt with "Plan" mode.

```
I’m building a cooking receipe sharing application that people register their own recipes and share with other users. Use Next.js and Material UI (UI) for frontend, Supabase for DB + auth.

Give me the full architecture:
- File + folder structure
- What each part does
- Where state lives, how services connect

Format this entire document in markdown.
```

Run the prompt below with "Act" mode.

```
save this document as a markdown as .clinerules/01_architecture.md
```

## 1-2: Creating coding policy

Run the following prompt with "Plan" mode.

```
Add .clinerules/02_coding_policy.md for code practice in this project. I'd like to follow TDD approach and have unit tests and E2Es.
```

Change the mode from Plan to Act and save the file.


## 1-3: Creating a task list

Run the following prompt with "Plan" mode.

```
Using that @/.clinerules/01_architecture.md and @/.clinerules/02_coding_policy.md , write a granular step-by-step plan to build the MVP. 

Each task should: 
- Be incredibly small + testable
- Have a clear start + end
- Focus on one concern 

I’ll be passing this off to an engineering LLM that will be told to complete one task at a time, allowing me to test in between. 
```

Change the mode from Plan to Act and save the file.
