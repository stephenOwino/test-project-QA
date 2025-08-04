
import { test, expect } from "../fixtures/baseTest";
import { testData } from "../config/testData";
import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '..', '..'); 

test.describe("Upload and Download Functionality", () => {
  
  test.beforeEach(async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.goTo();
  });

  test("should display the Upload and Download page header", async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.verifyHeader(testData.uploadDownload.headerText);
  });

  test("should successfully download a file", async ({ uploadDownloadPage }) => {
    const expectedFileName = testData.uploadDownload.downloadFileName;
    const downloadPath = path.join(rootDir, 'temp', expectedFileName);

    await uploadDownloadPage.downloadFileAndVerify(
      testData.uploadDownload.downloadButtonText,
      expectedFileName,
      downloadPath
    );

    //the file exists
    expect(fs.existsSync(downloadPath)).toBeTruthy();
  });

  test("should successfully upload a file and display the file path", async ({ uploadDownloadPage }) => {
    const fileName = testData.uploadDownload.uploadFile;
    const filePath = path.join(rootDir, 'e2e', 'files', fileName);

    //dummy file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, 'This is a test file for upload.');
    }

    const expectedMessage = `${testData.uploadDownload.uploadedSuccessMessagePrefix}${fileName}`;
    await uploadDownloadPage.uploadFileAndVerify(filePath, expectedMessage);
  });
});
