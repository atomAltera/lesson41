import React, {useState, useEffect} from "react"
import styled from "styled-components"

type Kind = "success" | "error" | "info"

export const Notification = styled.div<{ kind: Kind }>`
    display: flex;
    justify-content: center;
    align-items: center;
    
    padding: 1em;
    
    border-radius: 4px;
  
    border: 1px solid ${(props) => {
      switch (props.kind) {
        case "success":
          return "green"
        case "error":
          return "red"
        case "info":
          return "blue"
      }
    }};
  
    background-color: ${(props) => {
        switch (props.kind) {
            case "success":
                return "#e6ffe6"
            case "error":
                return "#ffe6e6"
            case "info":
                return "#e6e6ff"
        }
    }};
    
    color: ${(props) => {
        switch (props.kind) {
            case "success":
                return "green"
            case "error":
                return "red"
            case "info":
                return "blue"
        }
    }};
`






