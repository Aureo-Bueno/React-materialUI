import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages';
import { useDrawerContext } from '../shared/context';

export const AppRoutes = () => { 
    const {setDrawerOption} = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                icon: 'home',
                path: '/home',
                label: 'Home',
            }
        ]);
    }, []);
    
    return (
        <Routes>
            <Route path="/home" element={<Dashboard/>} />

            <Route path="*" element={<Navigate to="/home"/>} />

        </Routes>
    );
};