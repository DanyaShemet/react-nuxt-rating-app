import React from "react";
import { Htag, Button, Paragraph, Tag } from "../components";


export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance='primary' arrow='down'>Текст</Button>
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
    </>
  );
}
