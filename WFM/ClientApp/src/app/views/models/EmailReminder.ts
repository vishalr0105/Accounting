export class EmailReminder {
    id: string
    reminderType: string
    subject: string
    message: string

    constructor(reminderType?: string, subject?: string, message?: string) {
        this.reminderType = reminderType;
        this.subject = subject;
        this.message = message
    }
  }
  