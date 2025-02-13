

import { Guid } from "@syncfusion/ej2/pdf-export"
import { Account } from "./Customer.model"
import { Company } from "./company"
import { QuoteMaterial } from "./quote"
import { warehouseModel } from "./warehouse.model"

export interface ItemsInorder {
    material: QuoteMaterial
    materialName:string
    materialId: string
    quantity: number
    rate: number
    salesOrder: any
    salesOrderId: string
    // discount: number
    amount: number
}

export interface salesOrderDto {
    salesOrder: SalesOrder
    attachments: any
    itemsInorder: ItemsInorder[]
}

export interface SalesOrder {
    nuOfItems:number
    customer: Account
    customerId: string
    salesOrderId: string
    salesOrderDate: string
    expectedShipmentDate: string
    paymentTerms: string
    address: string
    deliveryMethod: string
    salesPerson: string
    customerNote: string
    termsNconditions: string
    totalAmount: number
    isSent: boolean
    status: string
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
}

export interface PickListModel {
    itemsPicked:number
    itemsToPick:number
    itemsPacked:number
    picklistId: string
    date: string
    salesOrder: SalesOrder
    salesOrderId: string
    assigneeId: Guid
    warehouse: warehouseModel
    warehouseId: string
    notes: any
    status: string
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

export interface PickListItems {
    material: QuoteMaterial
    materialId: string
    pickList: PickListModel
    pickListId:string
    packListNu: string
    salesOrder: SalesOrder
    salesOrderId: string
    qtyOrdered: number
    qtyPacked: number
    qtyToPick: number
    qtyPicked: number
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }
  
  export interface ShipmentDTO {
    shipment: ShipmentModel
    items: ItemsInPickList[]
  }
  
  export interface ShipmentModel {
    companyId: string
    company: any
    customerName: string
    salesOrder: SalesOrder
    salesOrderId: string
    packageId: string
    shipmentOrder: string
    shipDate: string
    carrier: string
    trackingId: string
    trackingUrl: string
    shippingCharges: number
    shipmentAlreadyDelivered: boolean
    sendStatusNotification: boolean
    packList: PackListSo
    packListId: string
    notes: string
    id: string
    transferOrderId:Guid
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }
  
  export interface Item {
    item: any
    itemId: string
    packListNu: any
    pickList: any
    pickListId: string
    salesOrder: SalesOrder
    salesOrderId: string
    qtyOrdered: number
    qtyPacked: number
    qtyToPick: number
    qtyPicked: number
    status: string
    id: string
    createdBy: string
    updatedBy: string
    createdAt: string
    updatedAt: string
  }
  
  // export interface SalesOrder2 {
  //   customer: any
  //   customerId: string
  //   salesOrderId: string
  //   salesOrderDate: string
  //   expectedShipmentDate: string
  //   paymentTerms: string
  //   address: string
  //   deliveryMethod: string
  //   salesPerson: string
  //   customerNote: string
  //   termsNconditions: string
  //   totalAmount: number
  //   isSent: boolean
  //   status: string
  //   id: string
  //   createdBy: string
  //   updatedBy: any
  //   createdAt: string
  //   updatedAt: string
  // }
  
  export interface PickListDtoSo {
    pickList: PickListModel
    itemsInPickList: ItemsInPickList[]
  }

  // export interface PackListDtoSo {
  //   packList: 
  //   itemsInPickList: ItemsInPickList[]
  // }

  export interface ItemsInPickList {
    materialName: string
    companyId: any
    company: Company
    material: QuoteMaterial
    materialId: string
    packListNu: any
    pickList: PickListModel
    pickListId: string
    salesOrder: SalesOrder
    salesOrderId: string
    itemSerialNumber:string
    qtyOrdered: number
    qtyPacked: number
    qtyToPick: number
    qtyPicked: number
    status: string
    id: string
    createdBy: string
    updatedBy: any
    createdAt: Date
    updatedAt: Date
  }


  export interface PackListDtoSo {
    packList: PackListSo
    itemsInPickList: ItemsInPickList[]
  }

  export interface PackListSo {
    itemsPacked:number
    itemsToPack:number
    packlistNu: string
    date: string
    salesOrder: SalesOrder
    salesOrderId: string
    assignee: any
    assigneeId: string
    warehouse: warehouseModel
    warehouseId: string
    notes: string
    status: string
    pickList: PickListModel
    pickListId: string
    companyId: string
    company: any
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

