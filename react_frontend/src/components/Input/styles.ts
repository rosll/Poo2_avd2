import styled, { css } from 'styled-components';


interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

  background: #fff;
  border: 2px solid #232129;
  padding: 16px;
  width: 40%;
  color: #333;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 15px;
  }

  ${(props) => props.isErrored
    && css`
      border-color: #c53030;
    `}

  ${(props) => props.isFocused
    && css`
      color: #ff9000;
      border-color: #42b0f5;
    `}

  ${(props) => props.isFilled
    && css`
    color: #ff9000;
  `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;

    &::placeholder {
      color: #a6a6a6;
    }
  }

`;

