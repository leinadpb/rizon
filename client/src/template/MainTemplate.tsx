import { Button, Text } from "@geist-ui/core"
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { useAuth } from "../hooks/useAuth";

const Navbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 16px;
`;

const MainTemplate = () => {
    const { loggedUser, token, onLogout } = useAuth();
    const navigate = useNavigate();


    if (!token) {
        return <Navigate to={'/login'} />
    }

    return <>
        <Navbar>
            <Text>{loggedUser?.email}</Text>
            <Button onClick={() => {
                if (!!onLogout) {
                    onLogout();
                    navigate('login');
                }
            }}>Logout</Button>
        </Navbar>
        <Outlet />
    </>

}

export default MainTemplate;