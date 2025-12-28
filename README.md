# Admin Dashboard

This is a dashboard I built to manage users and products. It's clean, fast, and works on phones too.

## What it does
*   **Log in securely:** You can't see anything without signing in.
*   **See the big picture:** The home screen shows you total user and product stats.
*   **Manage Users:** You can search for people, filter the list, and click on anyone to see their full profile.
*   **Browse Products:** There's a nice grid of products. You can filter them by category (like "Smartphones") or search for something specific.

## How I built it
I used **Next.js** because it's great for building web apps properly.
For the design, I used **Material UI** so it looks professional out of the box.
To handle the data (like the list of users), I used **Zustand**.

### Why Zustand i used as per you said ?
I picked Zustand heavily over alternatives like Redux because:
1.  **It's tiny and fast:** It doesn't bloat the app.
2.  **No boilerplate:** With Redux, you have to write a ton of setup code just to do simple things. Zustand is just one file.
3.  **Handles API calls easily:** You can fetch data right inside the store without needing extra plugins (like Thunks or Sagas).
4.  **Great for this size:** For a dashboard like this, Redux is overkill. Zustand is perfect.


## Project Structure
Here is how I organized the files:
```text
src/
├── app/              # The pages (Dashboard, Login, Users, Products)
├── components/       # Reusable UI pieces (Sidebar, Header, Cards)
├── lib/              # Helper functions (API setup)
├── store/            # State management (Zustand stores)
└── middleware.ts     # Protections (redirects to login if not signed in)
```

## How to run it

1.  **Get the code:** Download this folder.
2.  **Install the tools:** Open your terminal in this folder and type:
    ```bash
    npm install
    ```
3.  **Setup keys:** Make a file called `.env.local` and paste this in:
    ```text
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=mysecretkey
    NEXT_PUBLIC_DEFAULT_USERNAME=michaelw
    NEXT_PUBLIC_DEFAULT_PASSWORD=michaelwpass
    ```
4.  **Start it:**
    ```bash
    npm run dev
    ```
5.  **Use it:** Go to `http://localhost:3000`.

## Login Details
The login screen will automatically fill in the details from your `.env` file.
*   **User:** `michaelw`
*   **Pass:** `michaelwpass`

That's it!
