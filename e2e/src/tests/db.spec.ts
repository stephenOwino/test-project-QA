import { expect, test } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

import { testData } from "../config/testData";

const prisma = new PrismaClient();

test.describe(`AppUser DB Test (via Prisma)`, () => {
  test.afterAll(async () => {
    await prisma.$disconnect();
  });

  test(`should create user with phone and attachment`, async () => {
    const now = Date.now();

    const user = await prisma.appUser.create({
      data: {
        attachments: {
          create: [
            {
              filename: testData.dbTest.attachmentFileName,
            },
          ],
        },
        cannot_change_password: false,
        email: `${testData.dbTest.usernamePrefix}${now}${testData.dbTest.emailDomain}`,
        enabled: true,
        firstname: `DB`,
        is_deleted: false,
        last_time_password_updated: new Date(`1970-01-01T00:00:00.000Z`),
        lastname: `Test`,
        nonlocked: true,
        password: `123`,
        password_never_expires: false,
        phones: {
          create: [
            {
              order_index: 1,
              phone: testData.dbTest.phoneNumber,
              phone_country_id: 1,
            },
          ],
        },
        username: `${testData.dbTest.usernamePrefix}${now}`,
      },
      include: {
        attachments: true,
        phones: true,
      },
    });

    expect(user).toBeDefined();
    expect(user.phones.length).toBeGreaterThan(0);
    expect(user.attachments.length).toBeGreaterThan(0);
    expect(user.phones[0].phone).toBe(testData.dbTest.phoneNumber);
    expect(user.attachments[0].filename).toBe(testData.dbTest.attachmentFileName);
  });
});

//https://www.db-fiddle.com/f/kbcYPcE8v8xmKyggH1mGg/1
