# 5 Sync users between auth.users and public.users

## Relevant PRs

You can find all commits for this chapter in the following PRs.

- https://github.com/takanabe/ai-lab/pull/6

## 5-1 Setup auth.users and public.users sync (and storing first/last name)

We have to manually execute some SQLs in Supabase SQL editor to sync users between `auth.users` and `public.users`

```
We need a `public.users` table  in Supabase. We only need 

- id
- first_name
- last_name

columns.

Also, for authentication, we usse `auth.users` table but the user ID is not synced automatically between auth.users and public.users. 

Please show SQLs for creating public.users table a trigger to create a new public.users when new users are added to auth.users.
```

Clien displays SQLs we need to run on SQL Editor.

```sql
-- 1. Create the public.users table
create table public.users (
  id uuid primary key,
  first_name text,
  last_name text
);

-- 2. Create a function to insert into public.users when a new auth.users row is created
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.users (id, first_name, last_name)
  values (new.id, '', '');
  return new;
end;
$$ language plpgsql security definer;

-- 3. Create a trigger on auth.users to call the function after insert
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();
```

![](images/5_1_Sync_users.png)

After executing the SQLs, ask Cline to update code.

prompt

```
Update documents, code, and tests
```

<details>
<summary>details for sync logic</summary>

To manage user profiles, we use two tables in Supabase:

- `auth.users`: Managed by Supabase Auth, stores authentication info.
- `public.users`: Stores user profile info (id, first_name, last_name).

### Step 1: Create and Sync public.users

```sql
-- 1. Create the public.users table
create table public.users (
  id uuid primary key,
  first_name text,
  last_name text
);

-- 2. Create a function to insert into public.users when a new auth.users row is created
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.users (id, first_name, last_name)
  values (new.id, '', '');
  return new;
end;
$$ language plpgsql security definer;

-- 3. Create a trigger on auth.users to call the function after insert
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();
```

### Step 2: Storing First and Last Name

After a user signs up, the app collects `first_name` and `last_name` in the SignUp form. Once the user is created in `auth.users`, the app updates the corresponding row in `public.users`:

```ts
// After successful signup and user is available
await supabase
  .from('users')
  .update({ first_name, last_name })
  .eq('id', user.id);
```

The code is responsible for this logic. This ensures that user profile information is kept in sync with authentication.
</details>


![](images/5_2_Signup.png)

![](images/5_3_Login.png)

![](images/5_4_Login_success.png)


prompt

```
Add "## 3. Sync DB users (auth.users and public.users)" to tasks.md and tune other section number starting from 3 with corresponded number.
```
