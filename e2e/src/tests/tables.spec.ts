import {test,expect} from "../fixtures/baseTest"
import { testData } from "../config/testData";


test.describe("Table Test", () => {

      test.beforeEach(async ({ webTablesPage }) => {
        await webTablesPage.goTo();
       });

       test("should display the table page header" , async ({webTablesPage}) =>{
        await webTablesPage.assertWebTableHeaderDisplayed(testData.webTable.headerText);
      })

      
   test("Add and Delete Record from Table", async ({ webTablesPage }) => {
      const newRecord = await webTablesPage.clickAddNewRecordButton();
      await webTablesPage.assertRecordExists(newRecord);

      await webTablesPage.deleteRecord(newRecord);
      await webTablesPage.assertRecordNotExists(newRecord);
  });

});

