import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const user = await prisma.appUser.create({
    data: {
      attachments: {
        create: [
          {
            filename: `seeded_attachment.pdf`,
          },
        ],
      },
      cannot_change_password: false,
      email: `testuser@example.com`,
      enabled: true,
      firstname: `Test`,
      is_deleted: false,
      last_time_password_updated: new Date(`1970-01-01T00:00:00.000Z`),
      lastname: `User`,
      nonlocked: true,
      password: `pass123`,
      password_never_expires: false,
      phones: {
        create: [
          {
            order_index: 1,
            phone: `+1234567890`,
            phone_country_id: 1,
          },
        ],
      },
      username: `testuser`,
    },
  });

  console.log(`Seeded user ID:`, user.id);
}

main()
  .catch((e: unknown) => {
    console.error(`Error during seeding:`, e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
