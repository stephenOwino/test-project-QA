import {test,expect} from "../fixtures/alerts&BrowserWindows.fixture"

test("alerts test" , async ({alertsPage}) =>{
    await alertsPage.goTo();
    await alertsPage.alertButtonClicked("You clicked a button");
    

})
