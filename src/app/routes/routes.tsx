import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteNavigation } from '../screens/site/site.navigation';

export const AppRoutes = () => {
    return isLogged();

    function isLogged() {
        return (
            <Routes>
                <Route path="*" element={SiteNavigation()} />
            </Routes>
        );
    }
};
