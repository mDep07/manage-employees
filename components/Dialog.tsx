import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Dialog = styled.dialog`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  margin-right: inherit;
  padding: 1rem;
  border: none;
  box-shadow: 0 3px 0 #ccc;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  gap: 10px;
  & * {
    margin: 0;
  }

  & .dialog__actions {
    
  }
`;

type Params = {
  open: boolean;
  children: any;
  actions:
    | [{ label: string; action: Function; bgColor: string | undefined }]
    | undefined;
};
export default function ({ open, children, actions }: Params) {
  return (
    <Dialog open={open}>
      <div className="dialog__body">{children}</div>
      <div className="dialog__actions">
        {actions ? (
          actions.map((a, i) => (
            <Button
              key={i}
              color={a.bgColor || '#828282'}
              onClick={() => a.action()}
            >
              {a.label}
            </Button>
          ))
        ) : (
          <Button color="#828282" onClick={() => console.log('Ok')}>
            Ok
          </Button>
        )}
      </div>
    </Dialog>
  );
}
