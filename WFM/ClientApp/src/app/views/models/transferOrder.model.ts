import { Guid } from "@syncfusion/ej2/pdf-export"
import { User } from "./user.model"
import { warehouseModel } from "./warehouse.model"

export interface ToPickListDto {
    pickListInfo: ToPickListInfo
    itemsInToPickList: ItemsInToPickList[]
  }

  export interface ToPickListInfo {
    itemsToBePicked:number
    itemsPicked:number
    itemsPacked:number
    picklistID: string
    date: string
    transferOrder: TransferOrderModel
    transferOrderId: string
    assignee: any
    assigneeId: any
    sourceWarehouse: warehouseModel
    sourceWarehouseId: string
    company: any
    companyId: string
    id: string
    notes:string
    createdBy: any
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

  export interface PackListDtoTo {
    packListInfo: PackListInfoDto
    itemsInToPickList: ItemsInToPickList[]
  }

  export interface PackListInfoDto {
    itemsPicked:number
    itemsPacked:number
    assignee: User
    assigneeId: string
    date: string
    notes: string
    picklist: ToPickListInfo
    picklistId: string
    transferOrder: TransferOrderModel
    transferOrderId: string
    warehouse: warehouseModel
    warehouseId: string
    packListNu: string
    company: any
    companyId: string
    id: string
    createdBy: any
    updatedBy: any
    createdAt: string
    updatedAt: string
    isShipmentCreated:boolean
  }
  export class TransferOrderModel{
    transferOrderID: string
    sourceWarehouseName:string
    destinationWarehouseName:string
    date: string
    status: string
    reasonOfTransfer: string
    sourceWarehouseId:string
    destinationWarehouseId:string
    id: string
    initiatedByName:string
    initiatedById:string
    approvedByName:string
    approvedById:string
    approvedAt:Date
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

  export interface ItemsInToPickList {
    item: any
    itemId: string
    pickList: ToPickListInfo
    pickListId: string
    packListNu:string
    transferOrderNu: string
    qtyOrdered: number
    qtyPacked: number
    qtyToPick: number
    qtyPicked: number
    qtyShipped:number
    status: string
    id: string
    createdBy: any
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

  export interface ShipmentDetail {
    itemsShipped:number
    transferOrderId: string
    transferOrder: TransferOrderModel
    packageId: string
    shipmentOrder: string
    shipDate: string
    carrier: string
    trackingId: string
    trackingUrl: string
    notes: string
    shippingCharges: number
    shipmentAlreadyDelivered: boolean
    sendStatusNotification: boolean
    packList:PackListInfoDto
    packListId: Guid
    company: any
    companyId: string
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

  export interface ShipmentDto {
    shipmentDetail: ShipmentDetail
    itemsInToPickList: ItemsInToPickList[]
  }
