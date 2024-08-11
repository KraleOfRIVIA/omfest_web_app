import React from 'react';
import MyDataTable from './components/user_table.tsx';
import { MainButton, useShowPopup, useWebApp } from '@vkruglikov/react-telegram-web-app';

export const App: React.FC = () => {
    const WebApp = useWebApp();
    const showPopup = useShowPopup();

    const handleClick = () =>
        showPopup({
            message: 'Hello, I am popup',
        });

    // Определение класса темы на основе цветовой схемы
    const themeClass = WebApp.colorScheme === 'dark' ? 'dark' : 'light';

    return (
        <div className={`bg-${themeClass}-background text-${themeClass}-text`}>
            <MainButton text="SHOW POPUP" onClick={handleClick} />
            <MyDataTable />
        </div>
    );
};
