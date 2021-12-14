import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';

const Dialog = styled.dialog`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
  margin-left: auto;
  max-width: calc(100% - 2rem);
  padding: 1rem;
  border: none;
  box-shadow: 0 3px 0 #ccc;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  & *:not(button) {
    margin: 0;
  }

  & button {
    min-width: 50px;
  }

  & .dialog__body {
    font-size: .9em;
    font-weight: 800;
  }

  & .dialog__actions {
    white-space: nowrap;
  }

  @media(max-width: 450px) {
    flex-direction: column;
    width: 90%;
    margin: 1rem auto;
  }
`;

type Params = {
  children: any;
  actions?: { label: string; action: Function; bgColor?: string }[];
};

export default function ({ open, children, actions }: Params) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => setShowModal(!!children), [children]);

  if (showModal) {
    return (
      <Dialog>
        <div className="dialog__body">{children}</div>
        <div className="dialog__actions">
          {actions ? (
            actions.map((a, i) => (
              <Button key={i} color={a.bgColor} onClick={() => a.action()}>
                {a.label}
              </Button>
            ))
          ) : (
            <Button onClick={() => setShowModal(false)}>Ok</Button>
          )}
        </div>
      </Dialog>
    );
  }

  return null;
}
