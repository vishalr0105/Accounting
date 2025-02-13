// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Permission } from './permission.model';


export class Site {

    constructor(name?: string, url?: string, description?: string) {

        this.name = name;
        this.url = url;
        this.description = description;
    }

    public id: string;
    public name: string;
    public url: string;
    public description: string;
}
