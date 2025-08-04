Prisma ORM Task Instructions for TypeScript Playwright Testing

This document provides instructions for a Prisma ORM task involving adding a missing table (attachment), seeding test data, and creating test data for the Attachment table linked to users, all within a TypeScript Playwright test environment. The task includes SQL migrations, Prisma schema updates, seeding, and testing.

Task Overview

The task involves:


Adding the attachment table to the database schema via SQL migration.



Seeding test data for the AppUser, UserPhone, and Attachment tables.


Writing a Playwright test to create user data with associated UserPhone and Attachment records and verify their integrity.

The database uses SQLite, and the application is built with Prisma ORM and TypeScript, tested with Playwright.

Changes Made


Added Missing Table: The attachment table was added to store file attachments linked to AppUser via the userId foreign key.

Schema Updates: The Prisma schema was updated to include the Attachment model, with a one-to-many relationship to AppUser (AppUser.attachments).

Constraints: Unique indexes on appuser.username, appuser.email, and role.name ensure data integrity.



Setup Instructions

Install Dependencies:

npm install @prisma/client bcrypt
npm install --save-dev 


Apply Migration:
Run the SQL migration script (migration.sql) to create the tables in the SQLite database

npx prisma migrate dev

SEED THE DB

npx ts-node seed.ts