import { GetStaticProps } from "next";
import React, { useState } from "react";
import { Htag, Button, Paragraph, Tag, Rating, Input, Textarea } from "../components";
import { withLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from './../interfaces/menuInterface';
import { API } from "../helpers/api";

function Home(): JSX.Element {
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

      <Tag size='s' color='gray'>тег 1</Tag>
      <Tag size='m' color='red'>тег 1</Tag>
      <Tag size='m' color='ghost'>тег 1</Tag>
      <Tag size='s' color='green'>тег 1</Tag>
      <Tag size='s' color='primary' href='google.com'>тег 1</Tag>

      <Rating rating={rating} isEditable={true} setRating={setRating}/>
      <Input placeholder='asxasx'/>
      <Textarea placeholder='Тест asasx'/>
    

    
     
     
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async ()  => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    } 
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory : number;

}