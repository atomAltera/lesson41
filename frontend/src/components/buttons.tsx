import styled from "styled-components";

export type Size = "small" | "medium" | "large";

function getSize(size?: Size) {
    size = size || "medium";

    switch (size) {
        case "small":
            return "12px";
        case "medium":
            return "14px";
        case "large":
            return "16px";
    }
}

export const Button = styled.button<{ size?: Size }>`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  display: inline-block;
  font-size: ${props => getSize(props.size)};
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 0;
  padding: 6px 12px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: #eee;
  }

  &:active {
    background: #ddd;
  }

  &:disabled {
    background: #eee;
    border-color: #ccc;
    color: #999;
  }
`;

export const PrimaryButton = styled(Button)`
  background: #337ab7;
  border-color: #2e6da4;
  color: #fff;

  &:hover:not(:disabled) {
    background: #286090;
    border-color: #204d74;
  }

  &:active {
    background: #204d74;
    border-color: #122b40;
  }
`;