# Chapter3: Integrating Supabase

## Relevant PRs

You can find all commits from this PR.

- https://github.com/takanabe/ai-lab/pull/4

## Overview

We will be using the SaaS platform [Supabase](https://supabase.com/) to handle our application's **database** and **authentication**. In this chapter, we will configure Supabase **manually** before integrating it into the application. This manual setup provides a clearer understanding of how the backend connects to your frontend and how environment variables and API keys are used in practice.


## 3-1 Sign-up

To begin the integration process, run the following prompt:

prompt

```
Move on to the next task.
```

Cline will respond with instructions to prepare Supabase manually.


![](images/3_5_prompt_for_supabase_integration.png)


Start by creating a new Supabase account at [https://supabase.com/dashboard/sign-up](https://supabase.com/dashboard/sign-up).


### Register your email and passowrd

Fill in your email address and set a password to create an account.


![](images/3_1_Sign-up_Supabase.png)

### Verify your registration

Check your inbox and complete the email verification process to activate your account.


![](image/../images/3_2_Email_verification.png)


### Configure organization and project

After verification, create a new **organization** using the **Free Plan**, and then create a new **project**.


![](images/3_3_New_organization.png)

![](images/3_4_New_project.png)

Once you've completed these steps, update your task list by running the following prompt:


```
Update tasks.md to complete the task.
```

## 3-2 Configuring env vars

After creating your Supabase project, you'll need to retrieve the project URL and public anonymous key (ANON key) to configure environment variables in your application.

Refer to the following images for where to find these values:


![](images/3_6_Supabase_env_var.png)

![](images/3_7_API_keys.png)

Once you have the information, run this prompt to register it into your setup:

prompt

```
Use following project URL and ANON key

Project URL: https://XXXXXXX.supabase.co
ANON key: YYYYYYYY
```

Then, update your task list with the following prompt:

```
Update tasks.md to complete the task.
```

## 3-3 Configure Supabase client

Now that you’ve set the environment variables, continue to the next step by running:

prompt

```
move on to the next task
```

This step will set up the Supabase client in your application and configure it to use the `.env` file you prepared earlier.

![](images/3_8_Supabase_Client_setup1.png)

![](images/3_9_Supabase_Client_setup2.png)

After verifying that the client is correctly configured, complete this task in your record by running:


prompt

```
Update tasks.md to complete the task.
```

## Conclusion

In this chapter, you manually set up and configured Supabase to serve as the backend for your application. You created a Supabase account, initialized an organization and project, and connected your app using environment variables and the Supabase client.
