export type Hotel = {
    name: string;
    id: string;
    totalRooms: number;
}

export type HotelRoom = {
    id: string;
    code: string;
    hotelId: string;
    available: boolean;
}

export interface SearchAvailableRooms {
    from: string;
    to: string;
}

export interface ReserverHotelRooms {
    from: string;
    to: string;
    roomCode: string;
}

export type User = {
    id: string;
    email: string;
}