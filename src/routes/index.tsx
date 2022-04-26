import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard , ListPerson} from '../pages';
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
            <Route path="/person/detail/:id" element={<p>Detalhe</p>} />

            <Route path="*" element={<Navigate to="/home"/>} />

        </Routes>
    );
};