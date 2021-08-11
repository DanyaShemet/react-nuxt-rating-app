
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Htag } from './../../components/Htag/Htag';
import React, { useReducer } from 'react';
import { Tag, HhData,Advantages, Sort, Product} from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({page, products, firstCategory, ...props}: TopPageComponentProps) :JSX.Element => {
    const shouldReducedMotion = useReducedMotion();

    const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating });
    const y = useScrollY();
    const setSort = (sort: SortEnum) => {
        dispatchSort({type: sort});
    };

    useEffect(() => {
        dispatchSort({type: 'reset', initialState: products});
    }, [products]);

    return (
        <div className={styles.wrapper}>
        
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='gray' size='m' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
        
                <Sort sort={sort} setSort={setSort}/>
            </div>

            <div role="list">
                {sortedProducts && sortedProducts.map(p => (<Product role="listitem" key={p._id} product={p} layout={shouldReducedMotion ? false : true}/>))}
            </div>

            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
            {
                firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />
            }

            {
                page.advantages && page.advantages.length > 0 && 
                <>
                    <Htag tag='h2'>Преимущества</Htag>
                    <Advantages advantages={page.advantages}/>
                </>
            }

            {
                page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}></div>
            }
             <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}


           
        </div>
    );
};

