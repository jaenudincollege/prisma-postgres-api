# prisma-postgres-api

A Node.js API using Prisma Client and PostgreSQL

---

## Prerequisites

- **Node.js** ≥16
- **pnpm**, **npm**, or **yarn**
- **PostgreSQL** (local, Docker, or remote)
- (Optional) **Docker & Docker Compose**

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/jaenudincollege/prisma-postgres-api.git
cd prisma-postgres-api

# install dependencies (choose one)
pnpm install
# or
npm install
# or
yarn install
```

### 2. Configure Database

Create a `.env` at project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

- Replace `USER`, `PASSWORD`, `HOST`, `PORT`,`DATABASE`., with your values.

#### Option A: Docker-Compose

```bash
docker-compose up -d
```

Then set `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb"`.

#### Option B: Existing Postgres

Point `DATABASE_URL` in `.env` at your running Postgres instance.

---

## Prisma Setup & Migrations

1. **Initialize Prisma** (creates `prisma/schema.prisma` and stub `.env`):

   ```bash
   npx prisma init
   # or
   pnpx prisma init
   ```

2. **Review/Edit** `prisma/schema.prisma` (see “Schema” below).

3. **Run Migration**:

   ```bash
   npx prisma migrate dev --name init
   # or
   pnpx prisma migrate dev --name init
   ```

This will create the tables and generate the client in `../generated/prisma`.

---

## Running the App

```bash
# Start dev server
npm run dev
# or
pnpm dev
# or
yarn dev
```

By default: `http://localhost:3000`.

---

## API Endpoint

### **`GET /api/products`**

- Returns all products with their categories.

**Response Schema:**

```json
[
  {
    "id": "uuid",
    "name": "Product Name",
    "image": "string|null",
    "description": "string|null",
    "quantity": number,
    "price": "decimal string",
    "created_at": "ISO datetime",
    "updated_at": "ISO datetime",
    "categories": [
      { "id": "uuid", "name": "Category Name" }
    ]
  },
  …
]
```

---

## Further Resources

- Prisma CRUD: [https://www.prisma.io/docs/orm/prisma-client/queries/crud](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- Postgres UUIDs (pgcrypto): [https://www.postgresql.org/docs/current/pgcrypto.html](https://www.postgresql.org/docs/current/pgcrypto.html)
