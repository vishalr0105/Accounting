
export class UserRole {
    id: string;
    name: string;
    description: string;
    companyId: string;
    features: Feature[];
    canDelete:boolean;
}


export class Module {

    name: string;
    description: string;
    isSelected: boolean;
    features: Feature[];
    // permissions: Permission[];
    parentId: string;
    permissions: Permission[];
}

export class Feature {
    id: string;
    code: string;
    isSelected: boolean;
    name: string;
    description: string;
    permissions: Permission[];
}

export class Permission {
    id: string;
    code: string;
    name: string;
    description: string;
    isSelected: boolean;
}
