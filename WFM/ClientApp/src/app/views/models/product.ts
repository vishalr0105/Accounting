export class Product {
    id: string
    productCode: string
    name: string
    inventoryId: string
    description: string
    taxeId: string
    unitCost: number
    quantity: number
    sellCost: number
    taxRate: number
    count: number
    clientAndSuppliersId: string
    productLocationId: string
    supplierName: string
    type: string
    stock: StockLevelsAndLocation[] = [];
    isDisabled: boolean = true;
  }

  export class StockLevelsAndLocation {
    id: string = null
    productLocationId: string
    primary: boolean = false
    alert: number
    quantity: number

    constructor(locationId? :string, alert?: number) {
      this.productLocationId = locationId;
      this.alert = alert;
    }
  }
  
  export class ProductLocation {
    id: string
    name: string
    description: string
    createdAt: string;
  }
  