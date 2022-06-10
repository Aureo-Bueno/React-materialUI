import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard , ListPerson, DetailPerson, ListCities, DetailCity} from '../pages';
import { useDrawerContext } from '../shared/context';

export const AppRoutes = () => { 
    const {setDrawerOptions} = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/home',
                label: 'Home',
            },
            {
                icon: 'location_city',
                path: '/city',
                label: 'Cidade',
            },
            {
                icon: 'people',
                path: '/person',
                label: 'Pessoa',
            },
        ]);
    }, []);
    
    return (
        <Routes>
            <Route path="/home" element={<Dashboard/>} />

            <Route path="/person" element={<ListPerson/>} />
            <Route path="/person/detail/:id" element={<DetailPerson />} />

            <Route path="/city" element={<ListCities/>} />
            <Route path="/city/detail/:id" element={<DetailCity />} />

            <Route path="*" element={<Navigate to="/home"/>} />

        </Routes>
    );
};