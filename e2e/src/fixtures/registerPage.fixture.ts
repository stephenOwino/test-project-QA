
import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

//MyFixture type
type MyFixtures = {
  registerPage: RegisterPage;
};

export const test = base.extend<MyFixtures>({
 
  registerPage: async ({ page }, use) => {
   
    const registerPage = new RegisterPage(page);

  
    await use(registerPage);

    
  },
});

export { expect } from '@playwright/test';
