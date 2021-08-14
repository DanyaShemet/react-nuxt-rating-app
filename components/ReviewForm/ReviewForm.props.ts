import { DetailedHTMLProps, HTMLAttributes} from "react";


export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes <HTMLDivElement>,HTMLDivElement > {
    isOpened: boolean;
    productId: string;
}