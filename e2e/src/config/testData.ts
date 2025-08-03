export const testData = {
  baseUrl: process.env.DEMOQA || "https://demoqa.com",
  defaultWait: 5000,

  // Data for the registration page
  expectedMessages: {
    registrationSuccess: "User Register Successfully.",
    userExists: "User exists!",
    weakPassword:
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
  },

  // Data for the alerts page
  alerts: {
    alertButtonMessage: "You clicked a button",
    timerAlertMessage: "This alert appeared after 5 seconds",
    confirmBoxMessage: "Do you confirm action?",
    confirmOkResult: "You selected Ok",
    confirmCancelResult: "You selected Cancel",
    promptDialogMessage: "Please enter your name",
    promptResultPrefix: "You entered ", //useful abstraction
    testName: "Stephen"
  },

  //browser window data
    browserWindow: {
        browserHeader: "Browser Windows",
        samplePageMessage: "This is a sample page",
        newWindowMessageText: "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.",
    }

};