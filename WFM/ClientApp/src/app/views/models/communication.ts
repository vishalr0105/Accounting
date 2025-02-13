export class Communication {
    id: string
    type: string;
    subject: string
    message: string
    autometicFollowEmail: boolean
    feedBacReview: string
    complateJobForm: boolean

    constructor(type?: string, 
        subject?: string, message?: 
        string, autometicFollowEmail?: 
        boolean, feedBacReview?: string, 
        complateJobForm?: boolean) {
            this.type = type;
            this.subject = subject;
            this.message = message;
            this.autometicFollowEmail = autometicFollowEmail;
            this.feedBacReview = feedBacReview;
            this.complateJobForm = complateJobForm;

    }
  }
  