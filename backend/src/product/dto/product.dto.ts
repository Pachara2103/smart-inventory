export class ProductDto{
    readonly sku: string;
    readonly name: string;
    readonly category:string;
    readonly quantity: string; 
    readonly unit: string;
    readonly price: string;
    readonly addedBy:string;
    imgPath?: string | null;

}