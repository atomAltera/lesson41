import React, {useState} from "react";
import {ResetFormData} from "../enitites";
import {PrimaryButton} from "./buttons";
import {Alert, Input, InputGroup} from "./form";

import styled from "styled-components";
import {Link} from "react-router-dom";

interface Props {
    onSubmit: (form: ResetFormData) => void;
}


interface Form {
    email?: string;
}

type Errors = Partial<Form>;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
  align-items: center;
`;

function validate(form: Form): Errors {
    const errors: Errors = {};

    // Email
    if (!form.email) {
        errors.email = "Email is required";
    }

    return errors;
}


export const ResetForm: React.FC<Props> = ({onSubmit}) => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Errors>({});

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors({});

        const errors = validate({
            email,
        })

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        onSubmit({
            email,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup bad={!!errors.email}>
                <label>Email</label>
                <Input
                    type="email"
                    placeholder="Your real email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {errors.email && <Alert>{errors.email}</Alert>}
            </InputGroup>

            <ButtonGroup>
                <PrimaryButton
                    size="large"
                    type="submit"
                >Submit</PrimaryButton>

                <Link to="/login">Login</Link>

            </ButtonGroup>
        </form>
    );
}
