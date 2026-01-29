
# Ominimo Blog Application

A modern, full-stack blog application built with **Laravel**, **Inertia.js**, and **React**, utilizing **TypeScript** for type safety and **Tailwind CSS** for a polished UI.

## 🚀 Tech Stack

- **Backend:** Laravel 12 (PHP 8.2+)
- **Frontend:** React 19+, Inertia.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript (.tsx)
- **Database:** MySQL (via Docker)
- **Environment:** Laravel Sail (Docker)

## ✨ Features

- **Authentication:** Secure login and registration flow.
- **CRUD Operations:** Create, Read, Update, and Delete posts.
- **Comments System:** Users and guests can comment on posts.
- **Authorization:**
  - Only post owners can edit/delete their posts.
  - Users can delete their own comments.
  - Post owners can moderate comments on their posts.
- **Type Safety:** Full TypeScript support for Props, Models, and Page data.
- **Responsive Design:** Mobile-first UI with a clean, modern aesthetic.

---

## 🛠️ Installation & Setup

This project uses **Laravel Sail** (Docker) for a consistent development environment. Ensure you have Docker Desktop installed and running.

### 1. Clone the repository

git clone https://github.com/balintpethe/ominimo-blog.git
cd ominimo-blog

```

### 2. Configure Environment

```bash
cp .env.example .env

```

*Note: The default `.env` is configured for Sail (MySQL host is `mysql`).*

### 3. Install Dependencies

First, install the composer dependencies to get the Sail binary:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs

```

### 4. Start the Application (Docker)

Start the containers in detached mode:

```bash
./vendor/bin/sail up -d

```

### 5. Frontend Setup & Database

Once the containers are running:

```bash
# Install Node dependencies
./vendor/bin/sail npm install

# Generate App Key
./vendor/bin/sail artisan key:generate

# Run Migrations & Seed Database
./vendor/bin/sail artisan migrate:fresh --seed

```

### 6. Run the Frontend Build

To compile assets and watch for changes:

```bash
./vendor/bin/sail npm run dev

```

The application is now accessible at: **[http://localhost](https://www.google.com/search?q=http://localhost)**

---

## ✅ Running Tests

The application includes Feature tests covering authentication, post creation, and authorization logic.

To run the test suite:

```bash
./vendor/bin/sail artisan test

```

---

## 🏗️ Architectural Decisions

### TypeScript & Type Safety

I chose TypeScript (`.tsx`) over standard JavaScript to ensure type safety across the frontend. Shared interfaces (User, Post, Comment) are defined in `resources/js/types/index.ts` to prevent prop drilling errors and improve developer experience.

### Routing Strategy

Instead of relying on client-side routing libraries or the Ziggy helper (which can introduce complexity in smaller scopes), I utilized **Direct Routing** combined with Inertia's `Link` component. This ensures explicit, readable paths (e.g., `/posts/${id}`) and decouples the frontend slightly from backend route naming conventions.

### Component modularity

The UI is broken down into reusable components (e.g., `PostCard`, `CommentItem`, `UserAvatar`) to maintain the "DRY" (Don't Repeat Yourself) principle and ensure visual consistency across the Dashboard and Public pages.

---

## 👤 Default Credentials (Seeder)

If you ran the seeder, you can log in with:

User:
* **Email:** `user@example.com`
* **Password:** `password`

Admin:
* **Email:** `admin@example.com`
* **Password:** `password`

Or register a new account at `/register`.
