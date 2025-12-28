# Detailed Project Plan

## Phase 1: Project Initialization & Setup

1.  **Create Next.js Project**
    *   Command: `npx create-next-app@latest . --typescript --eslint --no-tailwind --src-dir --app --import-alias "@/*"`
    *   *Note: Using `--no-tailwind` to strictly use MUI as requested.*

2.  **Install Dependencies**
    *   **UI Library**: `npm install @mui/material @mui/icons-material @emotion/react @emotion/styled`
    *   **State Management**: `npm install zustand`
    *   **Authentication**: `npm install next-auth`
    *   **HTTP Client**: `npm install axios`
    *   **Utilities**: `npm install lodash` (optional, for debounce/throttling search)

3.  **Clean Up Boilerplate**
    *   Remove `page.module.css` and default contents of `src/app/page.tsx` and `src/app/globals.css`.

4.  **Setup Material-UI Registry (Next.js App Router)**
    *   Create `src/components/ThemeRegistry/ThemeRegistry.tsx`: Wraps the app with `ThemeProvider` and handles SSR emotion cache.
    *   Create `src/lib/theme.ts`: Define the custom MUI theme (colors, typography).
    *   Wrap `children` in `src/app/layout.tsx` with `<ThemeRegistry>`.

## Phase 2: State Management & API Layer (Zustand)

5.  **Create API Utilities**
    *   Create `src/lib/api.ts`: Setup Axios instance with base URL `https://dummyjson.com`.

6.  **Setup Authentication Store (`useAuthStore`)**
    *   File: `src/store/useAuthStore.ts`
    *   State: `user` (User object or null), `token` (string), `isLoading` (boolean), `error` (string).
    *   Actions:
        *   `login(username, password)`: Calls `POST /auth/login`. On success, updates state and localStorage.
        *   `logout()`: Clears state and localStorage.

7.  **Setup Users Store (`useUserStore`)**
    *   File: `src/store/useUserStore.ts`
    *   State: `users` (array), `total` (number), `skip` (number), `limit` (number), `isLoading` (boolean), `searchTerm` (string).
    *   Actions:
        *   `fetchUsers(params)`: Calls `/users` or `/users/search`. Checks if data is already cached (optional, or just rely on fresh fetch for valid pagination).
        *   `setSearchTerm(term)`: Updates search term.

8.  **Setup Products Store (`useProductStore`)**
    *   File: `src/store/useProductStore.ts`
    *   State: `products` (array), `categories` (array), `total`, `skip`, `limit`, `isLoading`, `filters`.
    *   Actions:
        *   `fetchProducts(params)`: Calls `/products`, `/products/search`, or `/products/category`.
        *   `fetchCategories()`: Calls `/products/categories`.

## Phase 3: Authentication Implementation

9.  **NextAuth Configuration**
    *   File: `src/app/api/auth/[...nextauth]/route.ts`
    *   Configure `CredentialsProvider` to authorize using the DummyJSON response.
    *   Setup `callbacks` to persist the generic `token` into the session session.

10. **Login Page**
    *   File: `src/app/(auth)/login/page.tsx`
    *   UI: Centered Card with Username/Password fields.
    *   Logic: Call `useAuthStore.getState().login()` or `signIn()` from NextAuth.
    *   *Requirement*: Use DummyJSON credentials (e.g., `emilys`, `emilyspass`).

11. **Protected Routes Middleware**
    *   File: `src/middleware.ts`
    *   Logic: Redirect unrestricted access to `/dashboard/*` to `/login`.

## Phase 4: Dashboard & Layout

12. **Dashboard Layout**
    *   File: `src/app/(dashboard)/layout.tsx`
    *   Components:
        *   **Sidebar**: Navigation links (Users, Products).
        *   **Navbar**: Logout button, User profile info.
    *   Ensure responsive design (Sidebar becomes a Drawer on mobile).

13. **Dashboard Home**
    *   File: `src/app/(dashboard)/page.tsx`
    *   Content: Welcome message, maybe some quick stats cards (Total Users, Total Products).

## Phase 5: Users Feature Development

14. **Users List Page**
    *   File: `src/app/(dashboard)/users/page.tsx`
    *   Components:
        *   **Search Bar**: Updates store `searchTerm`.
        *   **UserTable**: Displays users. Columns: Name, Email, Gender, Phone, Company.
        *   **Pagination**: MUI `TablePagination` linked to store `skip`/`limit`.
    *   Logic: `useEffect` to call `fetchUsers()` on mount or when `skip`/`search` changes.

15. **User Detail Client Page**
    *   File: `src/app/(dashboard)/users/[id]/page.tsx`
    *   Logic: Fetch user by ID (can add `fetchUserById` to store or just fetch locally).
    *   UI: Card with full details. Back button to `/users`.

## Phase 6: Products Feature Development

16. **Products List Page**
    *   File: `src/app/(dashboard)/products/page.tsx`
    *   Components:
        *   **FilterBar**: Search input + Category Select dropdown.
        *   **ProductGrid**: Grid of `ProductCard` components.
        *   **ProductCard**: Image, Title, Price, Rating.
    *   Logic: Similar to Users, connect to `useProductStore`.

17. **Product Detail Page**
    *   File: `src/app/(dashboard)/products/[id]/page.tsx`
    *   UI: Image Carousel (can use a simple request helper for images or a library like `react-swipeable-views` if needed, or just standard MUI Stepper/Tabs).
    *   Display: Description, Price, Rating, Stock.

## Phase 7: Optimization & Final Polish

18. **Caching & Optimization**
    *   Review `fetch` calls in Zustand.
    *   Implement basic check: `if (state.users.length > 0 && !forceRefetch) return;` (if caching strategy desires basic in-memory persistence).
    *   Wrap list items in `React.memo`.

19. **UI Polish**
    *   Ensure all Text/Colors come from the Theme.
    *   Check mobile responsiveness for Tables (scrollable container) and Grid (1 column on mobile, 3-4 on desktop).

20. **Documentation**
    *   Update `README.md` with:
        *   Project Title & Description.
        *   Tech Stack explanation (Why Zustand?).
        *   Setup/Run instructions.
        *   Environment Variables (if any).

21. **Verification**
    *   Manual walkthrough of all 4 requirements.
