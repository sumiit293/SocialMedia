import React from 'react';
import styled from 'styled-components';

const Input = styled.textarea`
  width: 100%;
  display: block;
  box-sizing: border-box;
  font-size: 16px;
  padding: 5px;
  border: 1px solid grey;
  outline: none;
  transition: all ease-in 0.3s;
  &.selected {
    border: 1px solid teal;
  };
`;

const Label = styled.p`
  margin: 10px 0px;
  padding: 2px 0px;
  font-size: 14px;
  font-weight: 700;
`;

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Errspan = styled.span`
  display: block;
  width: 100%;
  box-sizing: border-box;
  color: red;
  font-size: 12px;
`;

const RenderFieldTextArea = (field) => (
  <Wrapper>
    <Label>{field.label}</Label>
    <Input
      {...field.input}
      type={field.type}
      className={!!field.input.value || !!field.meta.active ? "selected" : ""}
      rows={field.rows ? field.rows : 2}
      placeholder={field.placeholder}
    />
    {field.meta.touched && field.meta.error &&
      <Errspan>{field.meta.error}</Errspan>}
  </Wrapper>
)

export default RenderFieldTextArea