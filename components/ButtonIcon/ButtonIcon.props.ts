import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import close from './close.svg';
import up from './up.svg';
import menu from './menu.svg';

export const icons = {
    up,
    close,
    menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    appearance: 'primary' | 'white';
    icon: IconName
}