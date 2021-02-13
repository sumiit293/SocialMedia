import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  display: block;
  padding: 5px 0px;
  margin: 0px;
  box-sizing: border-box;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  transition: all ease-in 0.3s;
  &.selected {
    border-bottom: 2px solid teal;
  };
`;

const Label = styled.p`
  margin: 0px;
  padding: 2px 0px;
  font-size: 14px;
`;

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const Errspan = styled.span`
  display: block;
  width: 100%;
  box-sizing: border-box;
  color: red;
  font-size: 12px;
`;

const RenderField = (field) => (
  <Wrapper>
    <Label>{field.label}</Label>
    <Input
      {...field.input}
      type={field.type}
      className={!!field.input.value || !!field.meta.active ? "selected" : ""} />
    {field.meta.touched && field.meta.error &&
      <Errspan>{field.meta.error}</Errspan>}
  </Wrapper>
)

export default RenderField