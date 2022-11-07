import { createBrowserRouter } from 'react-router-dom';
import AvailabilityPage from './pages/Availability.page';
import HomePage from './pages/Home.page';
import HotelsPage from './pages/Hotels.page';
import LoginPage from './pages/Login.page';
import ReservationsPage from './pages/Reservations.page';
import MainTemplate from './template/MainTemplate';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        element: <MainTemplate />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/:hotelId/availability',
                element: <AvailabilityPage />,
            },
            {
                path: '/hotels',
                element: <HotelsPage />,
            },
            {
                path: '/reservations',
                element: <ReservationsPage />,
            }
        ]
    },
]);

export default router;