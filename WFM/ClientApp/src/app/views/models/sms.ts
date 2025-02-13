export class Sms {
    id: string
    type: string
    notification: boolean
    message: string
    reminderDay: number

    constructor(type?: string, notification?: boolean, message?: string, reminderDay?: number) {
        this.type = type;
        this.notification = notification;
        this.message = message;
        this.reminderDay = reminderDay;
    }
  }
  