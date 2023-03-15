import styled from "styled-components";


export const Input = styled.input`
    display: block;
    padding: 0.5em;
    border: 1px solid #dedede;
    border-radius: 0.5em;
    font-size: 1em;
`;

export const Alert = styled.div`
  color: red;
`;

export const InputGroup = styled.div<{ bad?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  margin-bottom: 1em;

  ${Alert} {
    font-size: 0.8em;
  }

  ${Input} {
    border-color: ${(props) => (props.bad ? "red" : "auto")};
  }
`;

