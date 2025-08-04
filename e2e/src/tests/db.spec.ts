import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import { testData } from '../config/testData';

const prisma = new PrismaClient();

test.describe('AppUser DB Test (via Prisma)', () => {
  test.afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should create user with phone and attachment', async () => {
    const now = Date.now();

    const user = await prisma.appUser.create({
      data: {
        username: `${testData.dbTest.usernamePrefix}${now}`,
        firstname: "DB",
        lastname: "Test",
        email: `${testData.dbTest.usernamePrefix}${now}${testData.dbTest.emailDomain}`,
        password: "123",
        enabled: true,
        nonlocked: true,
        is_deleted: false,
        last_time_password_updated: new Date("1970-01-01T00:00:00.000Z"),
        password_never_expires: false,
        cannot_change_password: false,
        phones: {
          create: [{
            phone_country_id: 1,
            phone: testData.dbTest.phoneNumber,
            order_index: 1,
          }],
        },
        attachments: {
          create: [{
            filename: testData.dbTest.attachmentFileName,
          }],
        },
      },
      include: {
        phones: true,
        attachments: true,
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