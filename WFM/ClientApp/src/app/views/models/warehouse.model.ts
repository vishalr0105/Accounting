import { User } from "./user.model"

export class warehouseModel {
    wareHouseName: string
    status:string
    warehouseType: string = "privateWH"
    availableCapacity: number
    maximumCapacity: number
    contactPerson:User
    contactPersonId:string
    unitOfMeasurement: string
    address: string
    zipcode: string
    city: string
    country:string
    state: string
    phoneNumber: string
    email: string
    warehouseProfile:string
    vehicleNu: any
    fieldTechnician:User
    fieldTechnicianId:string
    id: string
    lng:string
    latt:string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  warehouseRacks = []
  }

export class WarehouseReceive {
  warehouse: warehouseModel
  warehouseRacks: WarehouseRackDto[]
}

export interface WarehouseRackDto {
  rack: Rack
  shelfs: Shelf[]
}

export interface serializedItemLocation{
  id?:string,
  itemId?:string,
  itemSrNum:string,
  warehouseId:string,
  rackId:string,
  shelfId:string
}

export interface nonSerializedItemLocation{
  id?:string,
  itemId?:string,
  quantity:number,
  warehouseId:string,
  rackId:string,
  shelfId:string
}

export interface Rack {
  warehouse: warehouseModel
  warehouseId: string
  rackName: string
  id: string
  createdBy: string
  updatedBy: any
  createdAt: string
  updatedAt: string
}

export interface Shelf {
  warehouse: warehouseModel
  warehouseId: string
  shelfName: string
  rack: Rack
  rackId: string
  id: string
  createdBy: string
  updatedBy: any
  createdAt: string
  updatedAt: string
}

export class rackModel {
  id?:string
  warehouseId:string
  rackName:string
  shelfList:shelfModel[]
}

export class shelfModel{
  id?:string
  shelfName:string
  rackId:string
  warehouseId:string
}
