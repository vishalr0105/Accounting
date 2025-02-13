import { DateTime } from "@syncfusion/ej2-angular-charts"


export class InvoicesListModel{
    invoices:InvoiceModel[]
}

export class InvoiceModel{
    id?:string
    customerName?:string
    email:string
    address:string
    poNumber?:string
    invoiceNu:string
    invoiceDate:Date
    amountDue:number
    dueDate?:Date
    customerId:string
    paymentTerms?:string
    currencyType:string
    amount:number
    // customer:Client
    paymentStatus:string
    isPaid:boolean
    remarks?:string
    quoteId?:string
    jobId?:string
    sendToUser:boolean
    createdBy?:string
    workOrderId?:string
    items?:serviceModel[] = []
}

export class serviceModel {
    id?: string;
    serviceDate: Date;
    serviceName: string;
    description: string;
    quantity: number;
    unitCost: number;
    tax: number;
    amount: number;
    sellCost:number;
  }

  export class invoiceDTO{
    invoiceData:InvoiceModel
    items:serviceModel[]
  }