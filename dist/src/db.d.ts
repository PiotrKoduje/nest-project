export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}
type DBData = {
    products: Product[];
};
export declare const db: DBData;
export {};
