# Full Architecture for a Recipe Sharing Application

This architecture is designed for a modern web application using **Next.js** (React framework) and **Material UI** for the frontend, with **Supabase** providing authentication and database services. The structure is modular, scalable, and follows best practices for separation of concerns and maintainability.

---

## 1. File & Folder Structure

```
/recipe-app/
├── public/
│   └── images/                # Static images (e.g., logo, default avatars)
├── src/
│   ├── components/            # Reusable UI components (Buttons, RecipeCard, etc.)
│   ├── features/              # Feature-based folders (recipes, auth, users, etc.)
│   │   ├── recipes/
│   │   │   ├── components/    # Feature-specific components (RecipeForm, RecipeList)
│   │   │   ├── hooks/         # Custom hooks (useRecipes, useRecipeForm)
│   │   │   ├── services.ts    # Supabase queries for recipes
│   │   │   └── types.ts       # TypeScript types for recipes
│   │   └── auth/
│   │       ├── components/    # Auth forms (Login, Register)
│   │       ├── hooks/         # useAuth, useUser
│   │       ├── services.ts    # Supabase auth logic
│   │       └── types.ts
│   ├── pages/                 # Next.js pages (route-based)
│   │   ├── _app.tsx           # App entry, providers, global styles
│   │   ├── index.tsx          # Home page (feed of recipes)
│   │   ├── recipes/
│   │   │   ├── [id].tsx       # Recipe detail page
│   │   │   └── new.tsx        # New recipe form
│   │   ├── profile/
│   │   │   └── [username].tsx # User profile page
│   │   └── login.tsx          # Login page
│   ├── layouts/               # Layout components (MainLayout, AuthLayout)
│   ├── lib/                   # Supabase client, utility functions
│   │   ├── supabaseClient.ts  # Supabase client instance
│   │   └── helpers.ts         # Utility functions
│   ├── store/                 # State management (if using Zustand, Redux, etc.)
│   │   └── index.ts           # Store setup
│   ├── theme/                 # Material UI theme customization
│   │   └── theme.ts
│   └── types/                 # Global TypeScript types
│       └── index.ts
├── tests/
│   └── e2e/                   # End-to-end Playwright tests
├── .env.local                 # Environment variables (Supabase keys, etc.)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 2. What Each Part Does

### **public/**
- Static assets served directly by Next.js (images, favicon, etc.).

### **src/components/**
- Shared, reusable UI components (e.g., Button, Modal, Navbar, RecipeCard).

### **src/features/**
- **recipes/**: All logic, components, and hooks related to recipes (CRUD, listing, forms).
- **auth/**: Authentication logic, forms, and hooks (login, register, user state).

### **src/pages/**
- Next.js routing: each file is a route.
- **index.tsx**: Home/feed page showing latest/shared recipes.
- **recipes/[id].tsx**: Dynamic route for viewing a single recipe.
- **recipes/new.tsx**: Page for submitting a new recipe.
- **profile/[username].tsx**: User profile and their recipes.
- **login.tsx**: Login/register page.

### **src/layouts/**
- Layout wrappers for consistent UI (e.g., navigation, footer).

### **src/lib/**
- **supabaseClient.ts**: Initializes and exports the Supabase client.
- **helpers.ts**: Utility functions (e.g., formatting, validation).

### **src/store/**
- Centralized state management (optional, for global state like user, theme, etc.).
- Could use Zustand, Redux, or React Context.

### **src/theme/**
- Material UI theme customization (colors, typography, etc.).

### **src/types/**
- Global TypeScript types/interfaces.

### **.env.local**
- Environment variables (Supabase URL, anon key, etc.).

---

## 3. State Management & Service Connections

### **State Management**
- **Local State**: Form inputs, UI state (modals, snackbars) managed with React `useState` or feature-specific hooks.
- **Global State**: 
  - **User/Auth**: Managed via React Context or a state library (Zustand/Redux). User state is initialized from Supabase on app load.
  - **Theme**: Material UI theme state (light/dark mode) can be global.
  - **Recipes**: Usually fetched on-demand (SSR/CSR) and cached per page; can be global if needed for cross-page access.

### **Service Connections**
- **Supabase Client**: 
  - Initialized in `src/lib/supabaseClient.ts`.
  - Imported wherever DB or auth access is needed (e.g., in `services.ts` files in features).
- **Auth**:
  - Supabase Auth is used for registration, login, and session management.
  - User state is synced with Supabase and stored in global state/context.
- **Database**:
  - All recipe/user data is stored in Supabase Postgres.
  - CRUD operations are abstracted in `services.ts` files in each feature folder.
- **API Calls**:
  - Directly use Supabase client for DB/auth.
  - If needed, custom Next.js API routes can be added in `src/pages/api/` for server-side logic (e.g., image uploads, advanced validation).

---

## 4. How Everything Connects

```mermaid
flowchart TD
    subgraph Frontend [Next.js + Material UI]
        A[Pages (routes)]
        B[Feature Components]
        C[Global State/Context]
        D[Custom Hooks]
        E[Layouts]
    end

    subgraph Backend [Supabase]
        F[Auth Service]
        G[Database (Postgres)]
        H[Storage (optional, for images)]
    end

    A --> B
    B --> D
    D --> C
    B -->|CRUD| G
    B -->|Auth| F
    B -->|Image Upload| H
    C -->|User State| F
    A --> E
    E --> B

    F <--> G
    F <--> H
```

- **Pages** import feature components and layouts.
- **Feature components** use custom hooks for logic and state.
- **Hooks/services** interact with Supabase for data/auth.
- **Global state** holds user/session info, theme, etc.
- **Supabase** handles authentication, database, and (optionally) file storage.

---

## 5. Example: Recipe Creation Flow

1. **User** clicks "Add Recipe" → navigates to `/recipes/new`.
2. **RecipeForm** component (in `features/recipes/components/`) uses a custom hook (`useRecipeForm`) for form state and validation.
3. On submit, the form calls a function in `features/recipes/services.ts` which uses the Supabase client to insert the recipe into the DB.
4. On success, the user is redirected to the new recipe’s detail page (`/recipes/[id]`).

---

## 6. Summary Table

| Folder/File                | Purpose                                                      | State Lives Here? | Connects To         |
|----------------------------|-------------------------------------------------------------|-------------------|---------------------|
| `src/components/`          | Shared UI components                                        | No                | -                   |
| `src/features/recipes/`    | Recipe logic, UI, hooks, services                           | Local/Feature     | Supabase DB         |
| `src/features/auth/`       | Auth logic, UI, hooks, services                             | Global            | Supabase Auth       |
| `src/pages/`               | Routing, page-level data fetching                           | No                | All features        |
| `src/layouts/`             | Layout wrappers                                             | No                | All pages           |
| `src/lib/supabaseClient.ts`| Supabase client instance                                    | No                | Supabase            |
| `src/store/`               | Global state (user, theme, etc.)                            | Global            | All features        |
| `src/theme/`               | Material UI theme config                                    | Global            | All UI              |
| `.env.local`               | Environment variables                                       | No                | Supabase            |

---

## 7. Notes

- **SSR/SSG**: Next.js can use server-side rendering or static generation for public recipe pages for SEO.
- **Image Uploads**: Use Supabase Storage for user-uploaded recipe images.
- **Access Control**: Recipes are public, but only the owner can edit/delete.
- **Extensibility**: Add features like comments, likes, or tags as new feature folders.

---

This architecture provides a robust, scalable foundation for your recipe sharing application, leveraging the strengths of Next.js, Material UI, and Supabase.
