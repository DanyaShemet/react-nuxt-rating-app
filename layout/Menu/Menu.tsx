import { useContext, KeyboardEvent, useState} from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menuInterface";
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { firstLevelMenu } from "../../helpers/helpers";
import {motion} from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export const Menu = () :JSX.Element => {
  const shouldReducedMotion = useReducedMotion();
    const {menu, setMenu, firstCategory} =  useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const router = useRouter();

    const variants = {
      visible: {
        transition: shouldReducedMotion ? {} :{
          when: 'beforeChildren',
          staggerChildren: 0.1
        }
      },
      hidden: {
        
      }
    };
    const variantsChildren = {
      visible: {
        opacity: 1,
        height: 29
      },
      hidden: {
        opacity: shouldReducedMotion ? 1 : 0,
        height: 0
      }
    };

    const openSecondlevel = (secondCategory: string) => {
      setMenu && setMenu(menu.map(m => {
        if (m._id.secondCategory === secondCategory){
          setAnnounce(m.isOpened ? 'closed' : 'opened');
          m.isOpened = !m.isOpened;
        }
        return m;
      }));
    };
    const openSecondlevelKey = (key: KeyboardEvent, secondCategory: string) => {
      if (key.code === 'Space' || key.code === 'Enter'){
        key.preventDefault();
        openSecondlevel(secondCategory);
      }

    };


    const buildFirstLevel = () => {
      return (
        <ul className={styles.firstLevelList}>
          {firstLevelMenu.map(m => (
            <li key={m.route} aria-expanded={m.id === firstCategory}>
              <Link href={`/${m.route}`}>
                <a>
                  <div className={cn(styles.firstLevel, {
                        [styles.firstLevelActive]: m.id === firstCategory
                    })}>
                    {m.icon}
                    <span>
                      {m.name}
                    </span>
                  </div>
                </a>
              </Link>
             
              {m.id === firstCategory && buildSecondLevel(m)}
            </li>
          ))}
        </ul>
      );
    };

    const buildSecondLevel = (firstMenuItem: FirstLevelMenuItem) => {
      return (
        <ul className={styles.secondBlock}>
          {menu.map(m => {
            if  (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])){
              m.isOpened = true;
            }
            return(
              <li  key={m._id.secondCategory}>
                    <button className={styles.secondLevel} 
                    onKeyDown={(key:KeyboardEvent) => openSecondlevelKey(key, m._id.secondCategory)} 
                    onClick={() => openSecondlevel(m._id.secondCategory)}
                    aria-expanded={m.isOpened}
                    >{m._id.secondCategory}</button>
                    <motion.ul 
                      layout
                      variants={variants}
                      initial={m.isOpened ? 'visible' : 'hidden'}
                      animate={m.isOpened ? 'visible' : 'hidden'}
                      className={cn(styles.secondLevelBlock)}

                    >
                      {buildThirdLevel(m.pages, firstMenuItem.route, m.isOpened ?? false)}
                    </motion.ul>
              </li>
            );
          })}
        </ul>
      );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(p => (
              <motion.li key={p._id}
                variants={variantsChildren}
              >
                <Link href={`/${route}/${p.alias}`} >
                  <a tabIndex={isOpened ? 0 : -1} aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}  className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
                  })}>
                      {p.category}
                  </a>
                </Link>
              </motion.li>
              
              
            ))
        );
    };


  

    return (
      <nav className={styles.menu} role="navigation">
        {announce && <span role="log" className="visualyHidden">{announce === 'opened' ? 'развернуто': 'свернуто'}</span>}
        {buildFirstLevel()}
      </nav>
      
    );
};


