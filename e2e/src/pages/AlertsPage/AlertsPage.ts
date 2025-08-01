import { Page,Locator,expect } from "@playwright/test";

export class AlertsPage{
    readonly page: Page;
    readonly alertsButton: Locator;
    readonly timerAlertsButton:Locator;
    readonly youSelectedOkText:Locator;
    readonly youSelectedCancelText: Locator;
    readonly promtButton: Locator;
    readonly promptResultElemen: Locator;

    constructor(page : Page){
        this.page=page;
        this.alertsButton = page.locator('#alertButton');
        this.timerAlertsButton =  page.locator('#timerAlertButton');
        this.youSelectedOkText = page.locator('span#confirmResult');
        this.youSelectedCancelText = page.locator('span#confirmResult');
        this.promtButton = page.locator('#promtButton');
        this.promptResultElemen =  page.locator('span#promptResult');

        
    }

    async goTo(){
        await this.page.goto("/alerts");
    
}

//registration of event
async alertButtonClicked(dialogMessage: string){
    this.page.on('dialog', async(dialog) =>{
        await dialog.accept();
    })

    await this.alertsButton.click();


}
}

