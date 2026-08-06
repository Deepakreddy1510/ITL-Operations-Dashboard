# Upgrade on Windows

## Recommended safe method

1. Stop the old app with `Ctrl + C`.
2. Back up your existing database:

```cmd
copy prisma\dev.db prisma\dev-backup.db
```

3. Copy the updated project files into a new folder.
4. To keep existing data, copy your old `prisma\dev.db` into the new project's `prisma` folder.
5. Copy your old `.env` into the new project folder.
6. Run:

```cmd
npm install
npx prisma db push
npm run dev
```

Do not run `npm run db:seed` when preserving real data.

## Fresh demo setup

```cmd
copy .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Initial logins after seeding:
- manager@example.com / ChangeMe123!
- sales@example.com / Sales123!

Use the **User Access** page to add additional email accounts.
