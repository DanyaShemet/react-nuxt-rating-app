import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import React, {useEffect, useState, KeyboardEvent } from "react";

export const Rating = ({isEditable = false, rating, setRating, ...props}: RatingProps) :JSX.Element => {

    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect( () => {
        constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating:number) => {
        const updatedArray = ratingArray.map((r:JSX.Element, i:number) => {
            return (
                <span 
                    onMouseEnter={() => hoverRating(i + 1)}
                    onMouseLeave={() => hoverRating(rating)}
                    onClick={() => changeRating(i + 1)}
                    className={cn(styles.star, {
                        [styles.filled] : i < currentRating,
                        [styles.editable]: isEditable})}
                    >
                    <StarIcon
                        onKeyDown={(e:KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
                        tabIndex={isEditable ? 0 : -1}    
                    />   
                        
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

    const handleSpace = (rating: number, event: KeyboardEvent<SVGAElement>) => {
        if(event.code !== 'Space' || !setRating){
            return;
        }
        setRating(rating);
    };

    return (
        <div {...props}>
            {/* {ratingArray} */}
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
        </div>
    );
};

