# Bootstrapping Application

## Relevant PR

You can find all commits from this PR.

- https://github.com/takanabe/ai-lab/pull/3

## Bootstrap a new application

prompt

```
You're an engineer building this codebase.

You've been given .clinerules/01_architecture.md and task.md

- Read both carefully. There should be no ambiguity about what we're building.
- Follow tasks.md and complete one task at a time.
- After each task, stop. I'll test it. If it works, commit to git and move to the next.


### CODING PROTOCOL ###
Read .clinerules/02_coding_policy.md as Coding Instructions
```

This time, Cline automatically runs commands to boostrap Next.js application and start the application as follows.


![](images/2_1_start_nextjs_app.png)

Then, VSCode shows the application using the internal browser and show what the browser is displaying.

![](images/2_2_access_nestjs_app_from_vscode.png)


## Update tasks.md

prompt

```
Please update tasks.md to clarify which tasks we completed.
```


## Add technology_stack document

prompt

```
Add a new cliene rule called "03_technology_stack" and clarify we want to use


# Programming language
- TypeScript

# Web application framework
- Next.js
- React

# CSS framework
- Material UI

# Frontend state management
- Zustand
```

## Configure formatter

prompt

```
Configure prittier and use prittier format with `npm run format`
```


## Install dependencies

Because we are following `tasks.md`, the prompt can be very simple.

prompt

```
move on to the next task
```


![](images/2_3_install_deps_1.png)

![](images/2_4_install_deps_2.png)


There are errors from Playwright test executed by Cline

![](images/2_5_errors_from_playwright.png)

In this case, we need to lead the Cline fix and rerun the test. 


prompt

```
We must pass tests for Playwright because we have errors.
```

![](images/2_6_pass_playwright.png)



## Updading coding policy

prompt

```
Update coding_policy clien rule to add the following policy

- we always check `npx playwright test` passes without error. If there are errors. 
- We have to take a look at code changes and fix and rerun tests. 
- This loop must be executed at least 3 times if we have test failures.
```

prompt

```
Update tasks.md to complete the task.
```


## Setup TypeScript

prompt

```
Move on to the next task.
```


Seems like TypeScript was setup while installing dependencies.


```
Update tasks.md to complete the task.
```
