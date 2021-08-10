import { DetailedHTMLProps, HTMLAttributes} from "react";
import { ReviewModel } from "../../interfaces/product.interface";

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes <HTMLDivElement>,HTMLDivElement > {
    isOpened: boolean;
    productId: string;
}