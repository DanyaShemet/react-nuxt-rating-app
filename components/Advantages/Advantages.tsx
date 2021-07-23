import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import cn from 'classnames';
import React from 'react';
import CheckSVG from './check.svg';


export const Advantages = ({advantages}: AdvantagesProps) :JSX.Element => {
    return (
        <div className={styles.advantagesWrapper}>
            {advantages.map(a => (
                <div key={a._id} className={styles.advantage}>
                    <CheckSVG />
                    <div className={styles.title}>{a.title}</div>
                    <hr className={styles.vline} />
                    <div className={styles.desription}>
                        {a.description}
                    </div>
                </div>
            ))}
        </div>
    );
};

