import { VendorModel } from "./vendors.model";
import { Rack, Shelf, warehouseModel } from "./warehouse.model";

export interface ItemsModel {
  itemName: string;
  sku: string;
  description: string;
  category: string;
  status: string;
  isReturnable: boolean;
  length: number;
  breadth: number;
  height: number;
  unitOfMeasurementSize: string;
  weight: number;
  unitOfMeasurementWeight: string;
  volume: number;
  unitOfMeasurementVolume: string;
  brandName: string;
  vendor: VendorModel;
  vendorId: string;
  costPrice: number;
  sellingPrice: number;
  costPriceDescription: string;
  sellingPriceDescription: string;
  trackInventory: boolean;
  inventoryAccount: string;
  quantity: number;
  reorderPoint: number;
  openingStock: number;
  openingStockValue: number;
  upc: string;
  mpn: string;
  ean: string;
  isbn: string;
  warehouse: warehouseModel;
  warehouseId: string;
  shelfNum: string;
  rackNu: string;
  id: string;
  createdBy: string;
  updatedBy: any;
  createdAt: string;
  updatedAt: string;
  isSerialize:boolean;
  image:string
}

export interface ItemDto {
  item: ItemsModel
  serializedItems: SerializedItem[]
  nonSerializedItems: NonSerializedItem[]
}

export interface SerializedItem {
  item: ItemsModel
  itemId: string
  itemSrNum: string
  warehouse: warehouseModel
  warehouseId: string
  rack: Rack
  rackId: string
  shelf: any
  shelfId: string
  id: string
  createdBy: any
  updatedBy: any
  createdAt: string
  updatedAt: string
}

export interface NonSerializedItem {
  itemId: string
  warehouse: any
  warehouseId: string
  rack: Rack
  rackId: string
  shelf: Shelf
  quantity: number
  shelfId: string
  id: string
  createdBy: any
  updatedBy: any
  createdAt: string
  updatedAt: string
}
