# Step-by-Step MVP Build Plan for Recipe Sharing Application

✅ = Completed

This plan is based on the architecture in `.clinerules/01_architecture.md` and the coding policy in `.clinerules/02_coding_policy.md`. Each task is atomic, testable, and focused on a single concern, making it ideal for sequential handoff and testing.

---

## 0. Project Initialization

1. ✅ **Scaffold Next.js App**
   - Start: No project directory
   - End: Clean Next.js app scaffolded, runs with `npm run dev`
   - Test: App loads default page

2. **Install Dependencies**
   - Start: Clean Next.js app
   - End: Material UI, Supabase JS, Playwright, Jest, React Testing Library, ESLint, Prettier installed
   - Test: All packages present, `npm run dev` and `npm test` work

3. **Set Up TypeScript**
   - Start: JS or default TS config
   - End: TypeScript configured, `tsconfig.json` present, app compiles
   - Test: App builds and runs with TypeScript

---

## 1. Supabase Integration

4. **Create Supabase Project**
   - Start: No Supabase project
   - End: Supabase project created in dashboard
   - Test: Project visible in Supabase dashboard

5. **Configure Supabase Environment Variables**
   - Start: No `.env.local`
   - End: `.env.local` with Supabase URL and anon key
   - Test: Variables loaded, no runtime errors

6. **Add Supabase Client**
   - Start: No client code
   - End: `src/lib/supabaseClient.ts` exports initialized client
   - Test: Import and use client in a test file

---

## 2. Authentication

7. **Implement Sign Up Form**
   - Start: No sign up UI
   - End: `SignUpForm` component in `src/features/auth/components/`, calls Supabase sign up
   - Test: Unit test for form validation and Supabase call

8. **Implement Login Form**
   - Start: No login UI
   - End: `LoginForm` component in `src/features/auth/components/`, calls Supabase login
   - Test: Unit test for form validation and Supabase call

9. **Add Auth Page**
   - Start: No `/login` page
   - End: `src/pages/login.tsx` renders login/register forms
   - Test: Page renders, forms mount

10. **Persist Auth State**
    - Start: No user state
    - End: User state managed (React Context or Zustand), persists across reloads
    - Test: Auth state persists after reload (unit test)

11. **Protect Routes**
    - Start: All pages public
    - End: Redirects unauthenticated users from recipe creation/profile pages
    - Test: E2E test for route protection

---

## 3. Recipe CRUD

12. **Define Recipe Types**
    - Start: No types
    - End: `src/features/recipes/types.ts` with Recipe interface
    - Test: TypeScript type-checking

13. **Create Recipe Table in Supabase**
    - Start: No table
    - End: `recipes` table with fields (id, title, description, ingredients, steps, user_id, image_url, timestamps)
    - Test: Table visible in Supabase, can insert row

14. **Add Recipe Service Functions**
    - Start: No service code
    - End: `src/features/recipes/services.ts` with CRUD functions (create, read, update, delete)
    - Test: Unit tests for each function (mock Supabase)

15. **Implement Recipe Creation Form**
    - Start: No form
    - End: `RecipeForm` component in `src/features/recipes/components/`, uses custom hook for state
    - Test: Unit test for form validation

16. **Add New Recipe Page**
    - Start: No `/recipes/new` page
    - End: `src/pages/recipes/new.tsx` renders form, submits to service
    - Test: Page renders, form submits

17. **Test Recipe Creation**
    - Start: Form submits, but not verified
    - End: Recipe appears in DB, user redirected to detail page
    - Test: E2E test for recipe creation

18. **Implement Recipe List**
    - Start: No list
    - End: `RecipeList` component fetches and displays recipes
    - Test: Unit test for list rendering

19. **Add Home Page Feed**
    - Start: No feed
    - End: `src/pages/index.tsx` shows latest recipes using `RecipeList`
    - Test: Page renders, recipes visible

20. **Implement Recipe Detail Page**
    - Start: No detail page
    - End: `src/pages/recipes/[id].tsx` fetches and displays single recipe
    - Test: Page renders, correct recipe shown

21. **Test Recipe Read**
    - Start: Detail page exists
    - End: Can view any recipe by ID
    - Test: E2E test for recipe viewing

22. **Implement Edit Recipe**
    - Start: No edit
    - End: Edit form for owner, updates recipe in DB
    - Test: Unit and E2E test for editing

23. **Implement Delete Recipe**
    - Start: No delete
    - End: Owner can delete recipe, removed from DB and UI
    - Test: Unit and E2E test for deletion

---

## 4. User Profiles

24. **Create User Profile Page**
    - Start: No profile page
    - End: `src/pages/profile/[username].tsx` shows user info and their recipes
    - Test: Page renders, correct data shown

25. **List User’s Recipes**
    - Start: Profile page static
    - End: Profile page lists only that user’s recipes
    - Test: Unit/E2E test for filtering

---

## 5. UI & Layout

26. **Add Main Layout**
    - Start: No layout
    - End: `src/layouts/MainLayout.tsx` with header/nav/footer
    - Test: Layout renders on all pages

27. **Integrate Material UI Theme**
    - Start: Default theme
    - End: `src/theme/theme.ts` with custom colors, theme provider in `_app.tsx`
    - Test: Theme applied, colors/styles visible

28. **Add Shared Components**
    - Start: None
    - End: Button, Card, Navbar, etc. in `src/components/`
    - Test: Unit test for each component

---

## 6. Image Upload (Optional MVP)

29. **Enable Supabase Storage**
    - Start: No storage
    - End: Supabase storage bucket for images
    - Test: Can upload image via dashboard

30. **Add Image Upload to Recipe Form**
    - Start: No upload
    - End: Users can upload image, URL saved to recipe
    - Test: Unit/E2E test for upload

31. **Display Recipe Images**
    - Start: No images
    - End: Recipe cards and detail pages show images
    - Test: Images render in UI

---

## 7. Testing & Polish

32. **Manual Test All Flows**
    - Start: Features implemented
    - End: All flows (auth, CRUD, navigation) tested
    - Test: Manual/E2E test pass

33. **Add Error Handling & Loading States**
    - Start: None
    - End: All forms and pages handle errors and loading
    - Test: Unit/E2E test for error/loading

34. **Polish UI**
    - Start: Basic UI
    - End: Consistent, responsive, accessible design
    - Test: Visual/manual review

---

**All tasks must:**
- Be completed with TDD (write tests first)
- Pass all tests and formatters before commit
- Not be pushed as PRs by AI (human review required)

You can hand these off one at a time to your engineering LLM for implementation and validation.
