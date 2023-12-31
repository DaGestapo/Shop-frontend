export interface OptionsI {
    id: number;
    name: string;
}

export interface SelectedOptionsI extends OptionsI {
    selected: boolean;
}

export interface FilterI {
    title: string;
    options: SelectedOptionsI[]
  }

export interface CategoryI {
    types: OptionsI[];
    brands: OptionsI[];
}