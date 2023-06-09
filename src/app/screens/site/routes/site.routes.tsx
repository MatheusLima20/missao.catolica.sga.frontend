import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../screens/home';
import { Footer } from '../includes/footer';
import { Header } from '../includes/head';
import { PlatformRegistration } from '../screens/platoform.registration';
import { Article } from '../screens/article';

export const SiteRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/articles/:title/:id" element={<Article />} />
                <Route
                    path="/platform-register"
                    element={<PlatformRegistration />}
                />
            </Routes>
            <Footer />
        </>
    );
};
