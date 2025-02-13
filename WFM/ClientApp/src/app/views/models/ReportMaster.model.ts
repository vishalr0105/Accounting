export class ReportMaster {
  ReportId: number;
  DisplayName_Menu: string;
  View_Query: any;
  View_Query1: any;
  View_Query2: any;
  View_Query3: any;
  View_Query4: any;
  Columns: any;
  DefaultCondition: criteriamodel[] = [];
}

 export class criteriamodel {
   Column: string;
   Condition: string;
   Value: string;

   constructor(column?: string, condition?: string, value?: string) {
     this.Column = column;
     this.Condition = condition;
     this.Value = value
   }
 }


 export class SearchField {
   field: string;
   label: string;
   dataType: string;
   controlType: string = 'text';
   value: any;
   defaultValues?: any;
   dropDownValues?: NameValue[];
 }

 export class NameValue {
   name: any;
   value: any;
 }

