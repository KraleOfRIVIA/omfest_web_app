import React from 'react';
import MyDataTable from './components/user_table.tsx';
import WebApp from '@twa-dev/sdk';
import { MainButton } from '@twa-dev/sdk/react';

export const App: React.FC = () => {

    // Определение класса темы на основе цветовой схемы
    const themeClass = WebApp.colorScheme === 'dark' ? 'dark' : 'light';
    const user = WebApp.initDataUnsafe.user?.username;

    const show = () => {
        WebApp.showAlert(user ? user : 'undef')
    }
    return (
        <div className={`bg-${themeClass}-background text-${themeClass}-text`}>
            <MainButton onClick={show} text='123'/>
            <MyDataTable />
        </div>
    );
};
