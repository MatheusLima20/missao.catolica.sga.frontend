import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../screens/home';
import { Footer } from '../includes/footer';
import { Header } from '../includes/head';
import { PlatformRegistration } from '../screens/platoform.registration';
import { Content } from '../screens/content';

export const SiteRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/artigo/:title/:id" element={<Content />} />
                <Route
                    path="/homilia-diaria/:title/:id"
                    element={<Content />}
                />
                <Route
                    path="/platform-register"
                    element={<PlatformRegistration />}
                />
            </Routes>
            <Footer />
        </>
    );
};
