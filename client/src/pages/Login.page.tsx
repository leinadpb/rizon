import React, { useEffect, useState } from 'react';
import { Button, Page, Text, Input } from '@geist-ui/core';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useHttpService from '../hooks/useHttpService';
import { useAuth } from '../hooks/useAuth';

const InputWrapper = styled.div``;

const FormWrapper = styled.form`
  display: flex;
  margin-top: 24px;
  flex-direction: column;
  width: 30vw;

  ${InputWrapper} {
    margin: 16px 0px;
  }
`;


const LoginPage = () => {
    const [email, setEmail] = useState<string>('daniel.pena+1@gmail.com');

    const { authGet } = useHttpService();
    const { onLogin, token } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    const fetchUserbyEmail = async (_email: string) => {
        const resp = await authGet(`/user/${_email}`);

        console.log('onLogin', onLogin)

        if (!!onLogin) {
            onLogin('123456', resp.data); // Fake token
            // navigate('/')
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        fetchUserbyEmail(email);
    }

    return <Page>
        <Text h1>Hotel Booking App</Text>
        <FormWrapper onSubmit={handleSubmit}>
            <InputWrapper>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' width={'100%'} required type={'success'} />
            </InputWrapper>
            <Button type='success' htmlType='submit'>Use this user</Button>
        </FormWrapper>
    </Page>
}

export default LoginPage;