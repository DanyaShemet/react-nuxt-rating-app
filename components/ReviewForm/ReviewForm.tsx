import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import React, { useState } from 'react';
import { Input } from './../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseSVG from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import { API } from '../../helpers/api';
import axios from 'axios';

export const ReviewForm = ({productId, isOpened ,className, ...props}: ReviewFormProps) :JSX.Element => {

    const { register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean> (false);
    const [error, setError] = useState<string> ();
 
    const onSubmit =  async (formData:IReviewForm) => {
        try{
            const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, {...formData, productId});
            
            if (data.message){
                setIsSuccess(true);
                reset();
            }else{
                setError('Что то пошло не так');
            }
        }
        catch(e){
            
            setError(e.message);
        }
      
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input 
                    placeholder='Имя' 
                    error={errors.name}
                    {...register('name', { required: {value: true, message: 'Заполните имя'} })}
                    tabIndex={isOpened ? 0 : -1}
                />
                <Input className={styles.title} placeholder='Заголовок отзыва' 
                error={errors.title}
                {...register('title', { required: {value: true, message: 'Заполните заголовок'} })}
                tabIndex={isOpened ? 0 : -1}
                />
                <div className={styles.rating}>
                    <span>Оценка: </span>
                    <Controller control={control} name='rating' rules={{ required: {value: true, message: 'Укажите рейтинг'} }} render={
                        ({field}) => (
                            <Rating error={errors.rating} ref={field.ref} isEditable rating={field.value} setRating={field.onChange} tabIndex={isOpened ? 0 : -1}/>
                        )}/>
                </div>
                <Textarea className={styles.description} placeholder='Текст отзыва' 
                   error={errors.description}
                   {...register('description', { required: {value: true, message: 'Введите отзыв'} })}
                   tabIndex={isOpened ? 0 : -1}
                />
                <div className={styles.submit}>
                    <Button appearance='primary'   tabIndex={isOpened ? 0 : -1}>Отправить</Button>
                    <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {
                isSuccess &&  
                <div className={cn(styles.panel, styles.success)}>
                    <div className={styles.successTitle}>Ваш отзыв отправлен!</div>
                    <div>
                        Спасибо, ваш отзыв будет опубликов после проверки
                    </div>
                    <CloseSVG className={styles.close} onClick={() => {setIsSuccess(false)}}/>
                </div>
            }
            {error && 
                <div className={cn(styles.panel, styles.error)}>
                    Что то пошло не так, попробуйте обновить страницу
                   <CloseSVG className={styles.close} onClick={() => {setError(undefined)}}/>
               </div>
            }
           
        </form>
    );
};

