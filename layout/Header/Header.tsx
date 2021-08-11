import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import { SideBar } from '../SideBar/SideBar';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import { useReducedMotion } from 'framer-motion';

export const Header = ({className, ...props}:HeaderProps ) :JSX.Element => {
    const router = useRouter();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const shouldReducedMotion = useReducedMotion();
    useEffect(() => {
        setIsOpened(false);
    }, [router]);
    
    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transtion: {
                stiffness: 20
            }
        },
        closed: {
            opacity: shouldReducedMotion ? 1 : 0,
            x: '100%'
        }
    }

    return (
       <header className={cn(className, styles.header)} {...props}>
            <Logo />
            <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)}/>
            <motion.div className={styles.mobileMenu} variants={variants} initial='closed' animate={isOpened ? 'opened' : 'closed'}>
                <SideBar />
                <ButtonIcon appearance='white' icon='close' className={styles.menuClose} onClick={() => setIsOpened(false)}/>
            </motion.div>
       </header>
    );
};

