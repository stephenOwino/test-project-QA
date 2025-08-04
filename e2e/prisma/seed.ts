import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const user = await prisma.appUser.create({
    data: {
      username: "testuser",
      firstname: "Test",
      lastname: "User",
      password: "pass123",
      email: "testuser@example.com",
      nonlocked: true,
      enabled: true,
      last_time_password_updated: new Date("1970-01-01T00:00:00.000Z"),
      password_never_expires: false,
      cannot_change_password: false,
      is_deleted: false,
      phones: {
        create: [
          {
            phone_country_id: 1,
            phone: "+1234567890",
            order_index: 1,
          },
        ],
      },
      attachments: {
        create: [
          {
            filename: "seeded_attachment.pdf",
          },
        ],
      },
    },
  });

  console.log("Seeded user ID:", user.id);
}

main()
  .catch((e: unknown) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
