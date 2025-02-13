import { AssetMenagment } from "./assetMenagment";

export class ContractAndAssets {
  assetManagmentId: string = '';
  assetName: string;
  unitOfMeasurement: string = '';
  unitOfMeasurementValue: string;
  assetManagment: AssetMenagment

  constructor(
    assetManagmentId?: string,
    assetName?: string,
    unitOfMeasurement?: string,
    unitOfMeasurementValue?: string
  ) {
    this.assetManagmentId = assetManagmentId || '';
    this.assetName = assetName;
    this.unitOfMeasurement = unitOfMeasurement || '';
    this.unitOfMeasurementValue = unitOfMeasurementValue;
  }
}
