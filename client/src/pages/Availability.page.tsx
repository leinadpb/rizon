import React, { useEffect, useState } from 'react';
import { Button, Page, Text, Grid, Input, Card } from '@geist-ui/core';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ResultList } from '../common.styles';
import ResultListCard from '../components/ResultListCard';
import useHttpService from '../hooks/useHttpService';
import { Hotel, HotelRoom, ReserverHotelRooms, SearchAvailableRooms } from '../types';
import ContentLoading from '../components/ContentLoading';
import moment, { Moment } from 'moment';
import { DATE_FORMAT } from '../common';

const InputWrapper = styled(Input)``;
const ActionWrapper = styled.div``;

const FormWrapper = styled.form`
  display: flex;
  margin-top: 24px;
  padding: 16px;
  justify-content: flex-start;
  align-items: center;

  ${InputWrapper} {
    margin: 8px;
  }
  ${ActionWrapper} {
    margin: 8px;
  }
`;

const AvailabilityPage = () => {
    const { hotelId } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingRooms, setLoadingRooms] = useState<boolean>(false);
    const [hotel, setHotel] = useState<Hotel>();
    const [rooms, setRooms] = useState<HotelRoom[]>([]);

    const [fromDate, setFromDate] = useState<Moment>();
    const [toDate, setToDate] = useState<Moment>();

    const { authPost, authGet } = useHttpService();

    const fetchAvailableRooms = async (payload: SearchAvailableRooms) => {
        setLoadingRooms(true);
        try {
            const resp = await authPost(`/hotel/${hotelId}/available-rooms`, payload);
            setRooms(resp.data)
        } catch (e) {
            console.warn(e);
        } finally {
            setLoadingRooms(false)
        }
    }

    const reserveHotelRoom = async (payload: ReserverHotelRooms) => {
        try {
            await authPost(`/hotel/${hotelId}/reserve`, payload);
            handleSubmit();
        } catch (e) {
            console.warn(e);
        }
    }

    const fetchHotel = async (id: string) => {
        try {
            const resp = await authGet(`/hotel/${hotelId}`);
            setHotel(resp.data)
        } catch (e) {
            console.warn(e);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!hotelId) {
            return;
        }

        fetchHotel(hotelId);
    }, [hotelId]);

    const onItemClick = React.useCallback((itemId: string) => {
        if (!itemId || !fromDate || !toDate) {
            return;
        }

        if (fromDate.isAfter(toDate)) {
            return;
        }

        reserveHotelRoom({
            roomCode: itemId,
            from: fromDate.format(DATE_FORMAT),
            to: toDate.format(DATE_FORMAT),
        })
    }, [fromDate, toDate]);

    const items: React.ReactNode[] = React.useMemo(() => {
        return rooms.map((hotelRoom: HotelRoom) => {
            return <Grid xs={8}><ResultListCard
                key={hotelRoom.id}
                id={hotelRoom.code}
                title={hotelRoom.code}
                desc={``}
                actionButtonText={'Make reservation'}
                action={onItemClick}
            />
            </Grid>
        })
    }, [rooms, onItemClick]);

    const handleSubmit = (e?: any) => {
        e?.preventDefault();

        if (!fromDate || !toDate) {
            return;
        }

        if (fromDate.isAfter(toDate)) {
            return;
        }

        const payload: SearchAvailableRooms = {
            from: moment(fromDate).format(DATE_FORMAT),
            to: moment(toDate).format(DATE_FORMAT),
        }

        fetchAvailableRooms(payload);
    }

    return <Page>
        <Text h1>{hotel ? hotel.name : ''} - Availability</Text>
        <FormWrapper onSubmit={handleSubmit}>
            <InputWrapper htmlType={'date'} value={fromDate?.format(DATE_FORMAT)} onChange={(e) => setFromDate(moment(e.target.value))} />
            <InputWrapper htmlType={'date'} value={toDate?.format(DATE_FORMAT)} onChange={(e) => setToDate(moment(e.target.value))} />
            <ActionWrapper>
                <Button htmlType='submit' type={'success'}>Search</Button>
            </ActionWrapper>
        </FormWrapper>
        <ResultList>
            <Grid.Container gap={1.5}>
                {
                    loading ? <ContentLoading /> : items
                }
            </Grid.Container>
        </ResultList>
    </Page>
}

export default AvailabilityPage;