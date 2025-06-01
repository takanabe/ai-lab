# Chapter 7 User Profiles

## Relevant PRs

You can find all commits for this chapter in the following PRs.

- https://github.com/takanabe/ai-lab/pull/8

## Overview

Now that users can sign up, log in, and interact with recipes, it's time to implement **user profile functionality**. This will allow users to view and update their personal information—such as first and last names—stored in the `public.users` table, which we synced with `auth.users` in Chapter 5.

In this chapter, you’ll add the necessary UI and backend logic to support profile viewing and editing. You will also ensure that updates are securely scoped to the authenticated user, and reflect in the database appropriately.

As with the previous chapter, we’ll use the **Loop without human interaction** pattern, allowing Cline to complete multiple tasks in sequence based on existing context and task definitions.


## 7-1 Creating user profile

Run the following prompt to have Cline complete this chapter’s tasks:

prompt

```
Execute Task 25 and 26
```

This will trigger the implementation of:

- A profile page that retrieves the current user's information from `public.users`

Cline will automatically handle:
- UI component creation
- API calls to Supabase

Once the implementation is complete, review the output in your browser and test that updates to the profile are correctly stored in the database.

## Conclusion

In this chapter, you extended your application by adding user profile functionality. This included retrieving data from the `public.users` table and allowing authenticated users to update their profile details. You executed the task end-to-end using a single high-level instruction, continuing the pattern of working collaboratively with the AI agent to handle multi-step flows.

With this, your app now supports a full cycle of user account features—from authentication to personalized data management—completing a major milestone in your AI-assisted development workflow.
