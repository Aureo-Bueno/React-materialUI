import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard , ListCity} from '../pages';
import { useDrawerContext } from '../shared/context';

export const AppRoutes = () => { 
    const {setDrawerOption} = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                icon: 'home',
                path: '/home',
                label: 'Home',
            },
            {
                icon: 'location_city',
                path: '/cities',
                label: 'City',
            },
        ]);
    }, []);
    
    return (
        <Routes>
            <Route path="/home" element={<Dashboard/>} />
            <Route path="/cities" element={<ListCity/>} />
            {/**  <Route path="/cities/detalhe/:id" element={<ListCity/>} /> */} 

            <Route path="*" element={<Navigate to="/home"/>} />

        </Routes>
    );
};