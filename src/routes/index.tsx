import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/context';

export const AppRoutes = () => { 
    const {toggleDrawerOpen, setDrawerOption} = useDrawerContext();

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
            <Route path="/home" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle Theme </Button>} />

            <Route path="*" element={<Navigate to="/home"/>} />

        </Routes>
    );
};