export const testData = {
  // Data for the alerts page
  alerts: {
    alertButtonMessage: `You clicked a button`,
    confirmBoxMessage: `Do you confirm action?`,
    confirmCancelResult: `You selected Cancel`,
    confirmOkResult: `You selected Ok`,
    promptDialogMessage: `Please enter your name`,
    //abstraction
    promptResultPrefix: `You entered `,
    testName: `Stephen`,
    timerAlertMessage: `This alert appeared after 5 seconds`,
  },
  baseUrl: process.env.DEMOQA || `https://demoqa.com`,

  //browser window data
  browserWindow: {
    browserHeader: `Browser Windows`,
    newWindowMessageText: `Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.`,
    samplePageMessage: `This is a sample page`,
  },

  //db data
  dbTest: {
    attachmentFileName: `playwright_attachment.pdf`,
    emailDomain: `@example.com`,
    phoneNumber: `+111111111`,
    usernamePrefix: `dbtest_`,
  },

  defaultWait: 5000,
  // Data for the registration page
  expectedMessages: {
    registrationSuccess: `User Register Successfully.`,
    userExists: `User exists!`,
    weakPassword: `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`,
  },
  //upload-download data
  uploadDownload: {
    downloadButtonText: `Download`,
    downloadFileName: `sampleFile.jpeg`,
    headerText: `Upload and Download`,
    selectFileLabelText: `Select a file`,
    uploadedSuccessMessagePrefix: `C:\\fakepath\\`,
    uploadFile: `sampleFile.jpeg`,
  },

  //web-table data
  webTable: {
    headerText: `Web Tables`,
  },
};
