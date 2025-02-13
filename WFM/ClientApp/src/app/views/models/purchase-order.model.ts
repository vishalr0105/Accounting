import { ItemModel } from "@syncfusion/ej2-angular-navigations";
import { VendorModel } from "./vendors.model"

export class PurchaseOrderModel {
    purchaseReceiveInternalNotes:string;
    vendor: VendorModel
    isPurchaseReceived:boolean
    vendorId: string
    warehouse: any
    warehouseId: string
    purchaseOrderId: string
    reference: string
    date: string
    expectedDeliveryDate: string
    paymentTerms: string
    shipmentPreference: string
    discountType: string
    deliverTo: string
    currency: any
    deliveryAddress: string
    totalAmount: number
    discount: number = 0
    status:string
    amountAfterDiscount:number
    termsNcondition: string
    itemsInPOs: ItemsInPo[]
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
    isDraft:boolean
    ItemsInPOs:ItemsInPo[]=[]
  }

  export class PoBill{
    companyId: string
    company: any
    vendor: any
    vendorId: string
    amountAfterDiscount:number
    billDetails: string
    order: PurchaseOrderModel
    orderId: string
    warehouse: any
    warehouseId: string
    date: string
    dueDate: string
    paymentTerms: string
    discount: number
    termsNcondition: string
    totalAmount: number
    itemsInPOs: ItemsInPo[]
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

  export interface PurchaseOrderDto{
    purchaseOrder:PurchaseOrderModel
    itemsInPo:ItemsInPo[]
  }

  export interface ItemsInPo {
    companyId: string
    company: any
    item: ItemModel
    itemId: string
    poId: string
    po: PurchaseOrderModel
    qty: number
    rate: number
    amount: number
    id: string
    createdBy: any
    updatedBy: any
    createdAt: string
    updatedAt: string
  }
