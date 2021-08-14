import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import React, {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from "react";

export const Rating = forwardRef(({error, isEditable = false, rating, setRating, tabIndex, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>) :JSX.Element => {

    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);
    const computedFocus = (r: number, i: number):number => {
        if (!isEditable){
            return -1;
        }
        if (!rating && i === 0){
            return tabIndex ?? 0;
        }
        if (r === i + 1){
            return tabIndex ?? 0;
        }
        return -1;
    };

    useEffect( () => {
        constructRating(rating);
    }, [rating, tabIndex]);

    const constructRating = (currentRating:number) => {
        const updatedArray = ratingArray.map((r:JSX.Element, i:number) => {
            return (
                <span 
                    onMouseEnter={() => hoverRating(i + 1)}
                    onMouseLeave={() => hoverRating(rating)}
                    onClick={() => changeRating(i + 1)}
                    className={cn(styles.star, {
                        [styles.filled] : i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onKeyDown={(e:KeyboardEvent) => isEditable && handleKey(e)}
                    tabIndex={computedFocus(rating, i)}   
                    ref={r => ratingArrayRef.current?.push(r)} 
                    role={isEditable ? "slider" : ''}
                    aria-valuenow={rating}
                    aria-valuemax={5}
                    aria-label={isEditable ? "Укажите рейтинг" : ('рейтинг' + rating)}
                    aria-valuemin={1}
                    aria-invalid={error  ? true : false}
                    
                    >
                    <StarIcon />   
                </span>
              
            );
        });

        setRatingArray(updatedArray);
    };
    

    const hoverRating = (rating:number) => {
        if  (!isEditable){
            return;
        }
        constructRating(rating);
    };
    const changeRating = (rating : number) => {
        if  (!isEditable || !setRating){
            return;
        }
        setRating(rating);
    };

    const handleKey = (event: KeyboardEvent) => {
        if (!isEditable || !setRating) {
            return;
        }
        if(event.code === 'ArrowRight' || event.code === 'ArrowUp'){
            if (!rating){
                setRating(1);
            }else{
                event.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
          
        }
        if(event.code === 'ArrowLeft' || event.code === 'ArrowDown'){
            event.preventDefault();
            setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating-2]?.focus();
        }
    };

    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper,{
            [styles.error] : error
        })}>
            {ratingArray.map((r, i) => (<span key={i} >{r}</span>))}
            {error && <span role="alert" className={styles.errorMessage}>{error.message}</span> }
        </div>
    );
});

