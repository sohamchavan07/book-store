# 📚 BookStore: Your Digital Sanctuary

BookStore is a premium, full-stack Ruby on Rails application designed for book enthusiasts to discover, collect, and manage their personal libraries with a touch of elegance.

## ✨ Key Features

- **Premium UI:** A modern, dark/purple-themed interface with glassmorphism, smooth animations, and a focus on readability.
- **Smart Search:** Intuitive, database-agnostic search by title, author, or genre.
- **Collection Management:** Effortlessly add, edit, and organize your favorite reads.
- **Digital Sanctuary:** A personalized dashboard to track your reading journey.
- **Production Ready:** Optimized with Rails 8 features like Solid Cache, Solid Queue, and Thruster.
- **Kamal Ready:** Easy deployment to any cloud provider using Kamal and Docker.

## 🚀 Getting Started

### Prerequisites

- **Ruby:** 3.2.2+ (as specified in `.ruby-version`)
- **Node.js & Yarn:** Required for Tailwind CSS processing
- **SQLite3:** Local database engine

### Local Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd book-store
    ```

2.  **Install dependencies:**
    ```bash
    bundle install
    ```

3.  **Setup the database:**
    ```bash
    rails db:setup
    ```

4.  **Start the development server:**
    ```bash
    ./bin/dev
    ```
    Visit `http://localhost:3000` to see your sanctuary in action.

## 🔑 Development Access

For testing purposes, you can use the following pre-seeded accounts:

| Email | Password |
| :--- | :--- |
| `soham@gmail.com` | `Password123!` |
| `test@example.com` | `TestPassword123!` |

> [!WARNING]
> These credentials are for **development only**. Ensure they are removed or rotated before production deployment.

## 🛠 Tech Stack

- **Framework:** Ruby on Rails 8.0
- **Styling:** Tailwind CSS 4.0
- **Database:** SQLite3 with WAL mode (Production-ready)
- **Background Jobs:** Sidekiq / Solid Queue
- **Deployment:** Kamal 2.0
- **Asset Pipeline:** Propshaft & Importmap

## 🚢 Deployment

This application is ready for deployment with **Kamal**.

1.  Configure your `config/deploy.yml`.
2.  Set up your `RAILS_MASTER_KEY` and other secrets in `.env`.
3.  Deploy:
    ```bash
    kamal deploy
    ```

---
Made with ❤️ for the global community of readers.
