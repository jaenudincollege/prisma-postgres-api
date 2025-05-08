# prisma-postgres-api

# Product Catalog Schema

---

## Table: `products`

Stores your core product records.

| Column      | Type              | Constraints                     | Description                |
| ----------- | ----------------- | ------------------------------- | -------------------------- |
| id          | BIGINT / UUID     | PK, auto-increment / generated  | Unique product identifier  |
| name        | VARCHAR(255)      | NOT NULL                        | Product name               |
| slug        | VARCHAR(255)      | UNIQUE, NOT NULL                | URL-friendly unique key    |
| description | TEXT              |                                 | Full description           |
| sku         | VARCHAR(100)      | UNIQUE, NOT NULL                | Stock-keeping unit         |
| price       | DECIMAL(10,2)     | NOT NULL, DEFAULT 0.00          | Base price                 |
| cost        | DECIMAL(10,2)     | DEFAULT NULL                    | (Optional) Cost price      |
| status      | ENUM              | ('draft', 'active', 'archived') | Lifecycle status           |
| supplier_id | BIGINT            | FK → suppliers.id               | (Optional) Source supplier |
| created_at  | TIMESTAMP WITH TZ | NOT NULL, DEFAULT now()         | Creation timestamp         |
| updated_at  | TIMESTAMP WITH TZ | NOT NULL, DEFAULT now()         | Last update timestamp      |

---

## Table: `categories`

Categorize products into hierarchical buckets.

| Column    | Type         | Constraints                  | Description                    |
| --------- | ------------ | ---------------------------- | ------------------------------ |
| id        | BIGINT       | PK, auto-increment           | Unique category ID             |
| name      | VARCHAR(100) | NOT NULL, UNIQUE             | Category name                  |
| slug      | VARCHAR(100) | NOT NULL, UNIQUE             | URL-friendly key               |
| parent_id | BIGINT       | FK → categories.id, NULLABLE | For nesting (NULL = top-level) |

---

## Table: `product_categories`

Many-to-many pivot between products and categories.

| Column      | Type   | Constraints                        |
| ----------- | ------ | ---------------------------------- |
| product_id  | BIGINT | PK (composite), FK → products.id   |
| category_id | BIGINT | PK (composite), FK → categories.id |

---

## Table: `tags`

Free-form tags.

| Column | Type        | Constraints        |
| ------ | ----------- | ------------------ |
| id     | BIGINT      | PK, auto-increment |
| name   | VARCHAR(50) | UNIQUE, NOT NULL   |

---

## Table: `product_tags`

Many-to-many pivot for tags.

| Column     | Type   | Constraints                    |
| ---------- | ------ | ------------------------------ |
| product_id | BIGINT | PK composite, FK → products.id |
| tag_id     | BIGINT | PK composite, FK → tags.id     |

---

## Table: `product_images`

Multiple images per product.

| Column     | Type          | Constraints                | Description            |
| ---------- | ------------- | -------------------------- | ---------------------- |
| id         | BIGINT        | PK, auto-increment         |                        |
| product_id | BIGINT        | FK → products.id, NOT NULL |                        |
| url        | VARCHAR(2048) | NOT NULL                   | Image URL              |
| alt_text   | VARCHAR(255)  |                            | Accessibility caption  |
| sort_order | INT           | DEFAULT 0                  | Image ordering         |
| is_primary | BOOLEAN       | DEFAULT FALSE              | Marks the “main” image |

---

## Table: `suppliers` _(optional)_

Who you source products from.

| Column        | Type              | Constraints             | Description   |
| ------------- | ----------------- | ----------------------- | ------------- |
| id            | BIGINT            | PK, auto-increment      |               |
| name          | VARCHAR(255)      | NOT NULL, UNIQUE        | Supplier name |
| contact_email | VARCHAR(255)      |                         |               |
| phone         | VARCHAR(50)       |                         |               |
| created_at    | TIMESTAMP WITH TZ | NOT NULL, DEFAULT now() |               |

---

## Table: `inventory` _(optional)_

Track stock levels per warehouse.

| Column           | Type   | Constraints                      | Description           |
| ---------------- | ------ | -------------------------------- | --------------------- |
| product_id       | BIGINT | PK composite, FK → products.id   |                       |
| warehouse_id     | BIGINT | PK composite, FK → warehouses.id |                       |
| quantity_on_hand | INT    | NOT NULL, DEFAULT 0              | Current stock         |
| reorder_level    | INT    | DEFAULT 0                        | Restock trigger level |

---

## Table: `warehouses`

| Column   | Type         | Constraints        | Description       |
| -------- | ------------ | ------------------ | ----------------- |
| id       | BIGINT       | PK, auto-increment |                   |
| name     | VARCHAR(100) | NOT NULL           |                   |
| location | VARCHAR(255) |                    | e.g. "Jakarta HQ" |
