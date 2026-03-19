export interface ItemsInterface {
    Product_id: number;
    Product_name: string;
    Size: string;
    Gender?: string;
    Category?: string;
    Color: string;
    Price: number;
    Descount_price: number;
    
    Img_url?: string;
}

export interface ItemsFilterInterface {
    size: string[];
    gender: string[];
    category: string[];

    min_price: number;
    max_price: number;
}

export interface FilteredProductsName {
    id: number;
    name: string;
}

export interface CarouselInterface {
    img_URL: string;
    category: string;
    type: string;
}

export interface ImagesInterface {
    Product_id: number;
    Img_url: string;
}

export interface DetailsInterface {
    Description: string,
    Notes: string,
    Composition:string,
}

export interface CategoryInterface {
    Category_code: number;
    Description: string;
}

interface PreferencesInterface{
    color: string,
    size: string,
    qtd: number
}