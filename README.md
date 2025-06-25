# Lexiq 🚀

Lexiq is an open-source platform dedicated to the art and science of prompt engineering. Our mission is to empower creators, developers, and AI enthusiasts to discover, share, and refine prompts for large language models and generative AI systems.

# 📝 Note:

All the components are written using AI. Some Components like the floating hero images etc, were taken as a reference from other sources.

## 📚 Table of Contents

- [✨ Features](#-features)
- [⚡ Getting Started](#-getting-started)
- [🗂️ Project Structure](#️-project-structure)
- [🔑 Environment Variables](#-environment-variables)
- [🛠️ Scripts](#️-scripts)
- [🤝 Contributing](#-contributing)
- [🪪 License](#-license)
- [🌐 Community & Support](#-community--support)

## ✨ Features

- 📖 **Curated Prompt Library:** Explore a growing collection of high-quality prompts for models like GPT-4, Claude, Gemini, and more.
- 🤝 **Community Driven:** Share, remix, and collaborate on prompts. Star ⭐ and fork 🍴 your favorites.
- 🎓 **Learning Hub:** Access comprehensive guides, tutorials, and real-world examples to master prompt engineering.
- 👤 **User Profiles:** Showcase your best prompts and connect with other AI enthusiasts.
- 🔍 **Advanced Search & Filtering:** Find prompts by category, model, use case, or popularity.
- 🔒 **Secure & Private:** Prompts are private by default. Data is protected with enterprise-grade security.
- 💎 **Modern UI:** Beautiful, responsive interface with dark mode support.

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Bun](https://bun.sh/) (for database seeding)
- [PostgreSQL](https://www.postgresql.org/) database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/avalynndev/lexiq-web.git
   cd lexiq-web
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (see [Environment Variables](#-environment-variables)).
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```
5. **Seed the database (optional):**
   ```bash
   bun run db:seed
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 🗂️ Project Structure

```
lexiq-web/
├── app/                # Next.js app directory (routes, layouts, API)
│   ├── (dashboard)/    # Authenticated dashboard routes
│   ├── (marketing)/    # Public marketing pages
│   ├── api/            # API routes (REST endpoints)
│   └── ...
├── components/         # Reusable React components (UI, docs, etc.)
├── config/             # Site and app configuration
├── content/            # MDX documentation and guides
├── db/                 # Database connection and setup
├── drizzle/            # Drizzle ORM migrations and metadata
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and server logic
├── public/             # Static assets (images, icons)
├── schema/             # Database schema definitions
├── scripts/            # Utility scripts (e.g., seed)
├── styles/             # Global styles (Tailwind CSS)
├── ...
```

## 🔑 Environment Variables

Create a `.env` file in the root directory. Required variables include:

```
# Database
DATABASE_URL=postgres://user:password@host:port/dbname

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth/Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Better Auth
BETTER_AUTH_SECRET= randomly generated secret
BETTER_AUTH_URL=http://localhost:3000
```

Other variables may be required depending on your deployment and integrations.

## 🖼️ Screenshot

<p align="center">
  <img src="public/homepage-ui.png" alt="Lexiq Screenshot" width="80%" />
</p>

## 🛠️ Scripts

- `dev` — Start the development server
- `build` — Build the app for production
- `start` — Start the production server
- `lint` — Run ESLint
- `db:seed` — Seed the database with sample data (requires Bun)

## 🤝 Contributing

Lexiq is open-source and welcomes contributions! To get started:

1. Fork the repository
2. Make your changes and commit them
3. Push to your fork and open a pull request

Please follow the [Code of Conduct](https://github.com/avalynndev/lexiq-web/blob/main/CODE_OF_CONDUCT.md) and ensure your code is well-documented and tested.

## 🪪 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🌐 Community & Support

- [GitHub Issues](https://github.com/avalynndev/lexiq-web/issues) — Report bugs or request features
- [Twitter](https://twitter.com/avalynndev)

Lexiq is more than just a platform—it's a movement to make AI accessible, ethical, and impactful for everyone. Thank you for being part of our journey! 💜
