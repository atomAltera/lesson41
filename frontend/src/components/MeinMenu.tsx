import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import logoUrl from "../logo.svg";
import {User} from "../enitites";

interface Props {
    user?: User;
}

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #333;
  padding: 0.5rem;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    gap: 1rem;

    li {
      a {
        color: #dedede;
      }

      a.active {
        color: #fff;
      }
    }
  }
`;

const Logo = styled.img`
    height: 3rem;
    transform: translateY(2px);
    margin-right: 1rem;
`;

export const MainMenu: React.FC<Props> = ({user}) => {
    function handleLogoutClick(e: React.SyntheticEvent) {
        document.cookie = "session=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    return (
      <StyledNav>
        <NavLink to="/">
          <Logo src={logoUrl} alt="" />
        </NavLink>

          {user ? (
            <ul>
                <li><NavLink to="/feed">Feed</NavLink></li>
                <li><NavLink to="/articles">My Article</NavLink></li>
                <li><NavLink to="/articles/new">New Article</NavLink></li>
                <li><a href="/login" onClick={handleLogoutClick}>Logout</a></li>
            </ul>
          ) : (
            <ul>
                <li><NavLink to="/signup">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
          )}
      </StyledNav>
    );

}