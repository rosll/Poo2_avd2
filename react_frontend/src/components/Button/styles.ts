import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`

  background: #42b0f5;
  height: 56px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 15%;
  font-weight: 500;
  margin-top: 16px;
  justify-content: center;
  transition: background-color 0.2s;
  margin-right: 5px;

  &:hover {
    background: ${shade(0.2, '#333')}
  }
`;
