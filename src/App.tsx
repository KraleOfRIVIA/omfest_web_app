import React from 'react';
import MyDataTable from './components/user_table.tsx';
import WebApp from '@twa-dev/sdk';

export const App: React.FC = () => {

    // Определение класса темы на основе цветовой схемы
    const themeClass = WebApp.colorScheme === 'dark' ? 'dark' : 'light';
   
    return (
        <div className={`bg-${themeClass}-background text-${themeClass}-text`}>
            <MyDataTable />
        </div>
    );
};
