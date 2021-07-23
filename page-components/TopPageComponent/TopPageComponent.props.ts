import { TopLevelCategory, TopPageModule } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";

export interface TopPageComponentProps extends Record<string, unknown> {
    firstCategory: TopLevelCategory;
    page: TopPageModule,
    products: ProductModel[]
}