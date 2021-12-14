import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: .75rem;
  padding: 4px;
  background-color: ${({ color }) => color || '#a3a3a3'};
  border: none;
  color: #fff;
  cursor: pointer;
  min-width: 20%;
  margin: 0;
  margin-right: 4px;
  box-shadow: 0 3px 0 #232323;
  transform: translateY(-3px);
  &:hover {
    box-shadow: 0 2px 0 #232323;
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: 0 0 0 #232323;
    transform: translateY(0);
  }
`;

interface Params {
  children: JSX.Element | JSX.Element[] | string;
  onClick: () => void;
  color?: string;
}

export default function (props: Params) {
  return <Button {...props} />;
}
