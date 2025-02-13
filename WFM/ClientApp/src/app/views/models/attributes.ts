export class Attributes{
    attributeTableId: string;
    displaylable: string;
    attributeDropDown?: any;
    attributeTypeTable?: any;
    attributeTypeTableId: string
    isRequired: boolean;
    value: string;    
    attributeTypename : string;
    attributeDropDownValueId : string;
    name?: string[];
    attributeDropdownValueDto?: AttributeDropdown[];
    type: string;
}

export class AttributeType{
    attributeTypeTableId: string;
    attributeTypeTableName: string;
}

export class AttributeDropdown
{
    attributeDropdownValueId?:string;
    attributeTableId : string;
    attributeTableDto;
    name: string;
}