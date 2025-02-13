import { Injectable } from '@angular/core';
import { AnimationModel } from '@syncfusion/ej2-angular-charts';

@Injectable({
  providedIn: 'root'
})
export class ProgressbarService {
  public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
  public value: number = 40;
  showprogress=false;
  constructor() { }
}
