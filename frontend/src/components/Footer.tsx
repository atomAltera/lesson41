import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #333;
    padding: 0.5rem;
    color: #dedede;
`;

export const Footer: React.FC = () => {
    return (
      <StyledFooter>
        <p>&copy; &lt;Konstantin Alikhanov 2023&gt;</p>
      </StyledFooter>
    );
}