import React from 'react';
import { Page, Text, Grid } from '@geist-ui/core';
import { ResultList } from '../common.styles';
import ResultListCard from '../components/ResultListCard';
import ContentLoading from '../components/ContentLoading';
import { Hotel } from '../types';
import { useNavigate } from 'react-router-dom';
import useHttpService from '../hooks/useHttpService';

const HotelsPage = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [hotels, setHotels] = React.useState<Hotel[]>([]);
    const navigate = useNavigate();
    const { authGet } = useHttpService();

    const fetchHotels = async () => {
        try {
            const resp = await authGet('/hotel');
            setHotels(resp.data);
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchHotels();
    }, [])

    const onItemClick = React.useCallback((itemId: string) => {
        if (!itemId) {
            return;
        }
        navigate(`/${itemId}/availability`)
    }, []);

    const items: React.ReactNode[] = React.useMemo(() => {
        return hotels.map((hotel: Hotel) => {
            return <Grid xs={8}><ResultListCard
                id={hotel.id}
                title={hotel.name}
                desc={``}
                actionButtonText={'View'}
                action={onItemClick}
            />
            </Grid>
        })
    }, [hotels, onItemClick]);

    return <Page>
        <Text h1>Hotels</Text>
        <ResultList>
            <Grid.Container gap={1.5}>
                {
                    loading ? <ContentLoading /> : items
                }
            </Grid.Container>
        </ResultList>
    </Page>
}

export default HotelsPage;