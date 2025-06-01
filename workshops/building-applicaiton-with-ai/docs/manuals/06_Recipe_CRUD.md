# Chapter 6. Recipe CRUD

## Relevant PRs

You can find all commits for this chapter in the following PRs.

- https://github.com/takanabe/ai-lab/pull/7

## Overview

Now that you've gained hands-on experience using Cline to implement features and write tests, this chapter shifts to a higher level of autonomy. Instead of working through detailed step-by-step prompts, you will rely on the **Loop without human interaction** pattern. This technique enables the AI agent to execute multiple related tasks in sequence with minimal manual intervention, based on your project context and task definitions.

In this chapter, you will implement full CRUD (Create, Read, Update, Delete) functionality for a recipe feature, leveraging Supabase for data persistence and following the application architecture and coding policies you've already defined.

## 6-1 Implementing CRUD with AI Agent

If you haven't allow Cline to edit your code, give the permission from here.

Start by issuing a single high-level instruction to Cline:

prompt

```
Execute task 4: Recipe CRUD from start to end.
```

The AI agent will then ask you to run the necessary SQL statements to create the `recipes` table in Supabase:


```sql
create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  ingredients text[] not null,
  steps text[] not null,
  user_id uuid references auth.users(id) not null,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Optional: trigger to update updated_at on row update
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on public.recipes
for each row execute procedure update_updated_at_column();
```

It depends on how you implement E2E tests but Taka added a test user that is used by E2E tests in advance.

![](images/6_1_adding_test_user.png)

![](images/6_2_test_user.png)

This creates the necessary schema for your recipe data, including timestamp tracking and user association.

Once the database is ready, you may want to update your architecture documentation to reflect new testing conventions:

prompt

```
Update "## 1. File & Folder Structure" in .clinerules/01_architecture.md to put E2E tests under tests/e2e/
```

Move the existing end-to-end tests into the appropriate directory:

prompt

```
move exisiting E2E tests under the e2e directory.
```

During implementation, Taka ra into issues such as authentication redirect errors. In that case, instruct the agent to debug and fix it:

prompt

```
When I access http://localhost:3000/recipes/new  after login, I was redirected to http://localhost:3000/login  pleas find the reason and fix the logic.
```

Continue working through the CRUD tasks by resuming from your task list:

prompt

```
Resume tasks from 19 to 24
```

After implementation, for better maintainability, consolidate recipe-related E2E tests into one file:

prompt

```
merge all  recipe E2E as a single file
```

![](images/6_4_create_recipe.png)

![](images/6_3_read_recipe.png)

![](images/6_5_edit_recipe.png)

As a result, your application will support creating, reading, editing, and deleting recipes.


# Conclusion

In this chapter, you implemented complete CRUD functionality for a recipe feature using Supabase and React. You used a higher-level prompt strategy—Loop without human interaction—which allowed Cline to autonomously coordinate multiple tasks from your task list and project context.

You also saw how to evolve your architecture and test structure while solving real-world problems like route protection and test integration. This phase marks a transition from guided learning to collaborative development—where AI becomes a capable teammate handling multi-step tasks, not just a code generator.

This approach scales well to larger feature sets and lays the foundation for building complex, production-ready applications using AI-driven workflows.
