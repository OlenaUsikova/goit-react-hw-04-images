import styled from 'styled-components';
export const Button = ({ clickHandler }) => {
  return (
    <StyledButton type="button" onClick={clickHandler}>
      Load more
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: 1px solid;
  border-radius: 3px;
  font-size: 20px;
  padding: 10px;
  margin: 10px auto;
  background-color: #3f51b5;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 3px 3px 4px lightblue;
  }
`;
