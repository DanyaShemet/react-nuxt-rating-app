import { SideBarProps } from './SideBar.props';
import React from 'react';
import styles from './SideBar.module.css';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';
import  cn from 'classnames';
export const SideBar = ({className, ...props}:SideBarProps ) :JSX.Element => {
    return (
       <div {...props} className={cn(className, styles.sidebar)}>
           <Logo className={styles.logo}/>
           <div>
               Поиск
           </div>
            <Menu />
       </div>
    );
};

