export class JobApplication {
    public id: number;
    public jobTitle: string;
    public jobLocation: string;
    public attachment: string;
    public firstName: string;
    public prefferdName: string;
    public lastName: string;
    public email: string;
    public cellPhone: string;
    public homePhone: string;
    public comments: string;
    public address: string;
    public city: string;
    public state: string;
    public postalCode: string;
    public status: string;   
    public date: Date;
    public jobApplicationNotes:JobApplicationNotes[]
}

export class JobApplicationNotes {
    id: number;
    jobApplicationId: number;
    userId: string;
    userName: string;
    date: Date;
    note: string;
  }


export class JobStatus {
    value: string;
    name: string;
  }