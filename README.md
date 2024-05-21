# Marine Portal

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/your-username/marine-portal.git
```

Then, navigate to the project directory and install dependencies:

```bash
cd marine-portal
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

## Features

### Company Side

1. **User Roles:**
   - Users are categorized into roles: admin, supervisor, staff, and marine.

2. **Company Registration:**
   - Superadmin/system admin registers companies in the system.
   - The registered user becomes the admin by default.

3. **User Management:**
   - Admin can create users (staff & supervisor) and verify marines under the company.

4. **Department Creation:**
   - Create departments to organize company structure.

5. **Position Creation:**
   - Define positions for marines (e.g., cadet, master) under specific departments.

6. **Certificate Management:**
   - Create certificates with validity months and associate them with positions or departments.

7. **Event Creation:**
   - Schedule events for training certificates and assign them to selected positions.

8. **Marine Verification:**
   - Admin verifies marines registered under the company.

9. **Certificate Issuance:**
   - Issue certificates to marines, including file upload (stored in Cloudinary) and issuance date calculation.

10. **Tickets:**
    - View and manage tickets submitted by marines, including resolution and optional messaging.

11. **Ship Management:**
    - Create ships and allocate positions with quantities per ship.

12. **Lineup:**
    - Assign marines to positions on ships, based on required quantities.

### Marines Side

1. **Registration:**
   - Marines register in the system, with their accounts set to pending.

2. **Ticket Submission:**
   - Submit tickets to make inquiries.

3. **Training Management:**
   - View required trainings based on position.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---
