export class Person {
    id_person?: number;
    name: string;
    secondName: string;
    thirdName?: string;
    address?: string;
    phone?: string;
}

export class CheckUp {
    id_checkup?: number;
    dateStart: Date;
    dateEnd: Date;
}

export class Oil {
    id_oil?: number;
    name: string;
}

export class Category {
    id_category?: number;
    name: string;
}

export class Brand {
    id_brand?: number;
    name: string;
}

export class Model {
    id_model?: number;
    name: string;
    brand: Brand;
    category: Category;
}

export interface Auto {
    id_auto?: number;
    number: string;
    person: Person;
    checkup?: CheckUp;
    model: Model;
    oil: Oil;
}
