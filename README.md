# Hyderabad Branch Manager Dashboard

A small multi-user CRUD dashboard for the Hyderabad branch of a pipe manufacturing company.

## Features
- JWT login stored in a secure HTTP-only browser cookie
- Multiple approved email accounts
- Admin user-access screen
- Create, edit and delete quotations, orders, customers, inventory, purchases and notifications
- Quotation and order status updates
- Purchase entries automatically update matching material stock
- Excel/CSV import
- SQLite for simple local use

## Setup on Windows Command Prompt

```cmd
copy .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000

Initial administrator account comes from `.env`:
- Email: manager@example.com
- Password: ChangeMe123!

A second seeded test account is also available:
- Email: sales@example.com
- Password: Sales123!

After login, open **User Access** to add more email accounts, disable accounts, reset passwords, or grant user-management access.

## Updating an existing installation
Back up `prisma/dev.db`, replace the application files, then run:

```cmd
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Warning: `npm run db:seed` resets demo data. Do not run it after entering real company data unless you want a reset.

## Deployment
SQLite is suitable for local use or a server with a persistent disk. For Vercel, switch Prisma to PostgreSQL because Vercel's filesystem is not persistent.
