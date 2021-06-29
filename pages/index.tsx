import React, { useEffect, useState } from "react";
import { Htag, Button, Paragraph, Tag, Rating } from "../components";


export default function Home(): JSX.Element {
   const [rating, setRating] = useState<number>(4);


  return (
    <>
      <Htag tag="h1">Ntrcn</Htag>
      <Button appearance='primary' arrow='down'  >Текст</Button>
      <Button appearance='ghost' arrow='down'>Текст</Button>
      <Button appearance='ghost' arrow='right'>Текст</Button>
      <Paragraph size='l'>Большой текст</Paragraph>
      <Paragraph size='m'>Средний текст</Paragraph>
      <Paragraph size='s'>Маленький текст</Paragraph>

      <Tag size='s' color='grey'>тег 1</Tag>
      <Tag size='m' color='red'>тег 1</Tag>
      <Tag size='m' color='ghost'>тег 1</Tag>
      <Tag size='s' color='green'>тег 1</Tag>
      <Tag size='s' color='primary' href='google.com'>тег 1</Tag>

      <Rating rating={rating} isEditable={true} setRating={setRating}/>
      <Rating rating={4} />
    </>
  );
}
