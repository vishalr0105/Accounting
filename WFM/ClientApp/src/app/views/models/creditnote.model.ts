export interface CreditNote {
    creditNoteNo: string
    creationDate: string
    invoice: any
    invoiceId: string
    reason: string
    salesPerson: any
    salesPersonId: string
    amount: number
    totalDiscount: number
    customersNotes: string
    companyId: string
    company: any
    amountAfterDiscount: number
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

  export interface CreditNoteDto {
    creditNote: CreditNote
    items: ItemInCreditNote[]
  }

  export interface ItemInCreditNote {
    service: any
    serviceId: string
    productName: string
    creditNote: CreditNote
    creditNoteId: string
    qty: number
    discount: number
    myProperty: number
    serviceDate: string
    rate: number
    sellCost: number
    companyId: any
    company: any
    tax: number
    amountAfterDiscount: number
    id: string
    createdBy: any
    updatedBy: any
    createdAt: string
    updatedAt: string
  }