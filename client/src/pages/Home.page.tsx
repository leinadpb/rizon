import { Button, Page, Text } from "@geist-ui/core";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 8px;
    width: 100%;
    display: flex;

    button {
        margin: 8px;
    }
`;


const HomePage = () => {
    const navigate = useNavigate();

    return <Page>
        <Text h1>Home</Text>
        <Wrapper>
            <Button onClick={() => navigate('/reservations')}>View my reservations</Button>
            <Button onClick={() => navigate('/hotels')}>View hotels</Button>
        </Wrapper>
    </Page>
}

export default HomePage;