export class Expensev2 {
    id: string;
    userId: string;
    jobIds: string[];
    jobs: string[];
    date: string;
    amount: number;
    description: string;
}

export class Expense {
    id: string;
    technician: string;
    managerId: string;
    expenseCategory: string;
    otherCategory: string;
    requestId:string;
    dueDate: Date;
    currency: string;
    purpose: string;
    amount: string;
    comments: string;
    status: string;
    expenseAttachments = new Array();
}
