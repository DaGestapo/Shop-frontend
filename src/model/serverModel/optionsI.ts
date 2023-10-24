export interface OptionsI {
    id: number;
    name: string;
}

export interface CategoryI {
    types: OptionsI[];
    brands: OptionsI[];
}