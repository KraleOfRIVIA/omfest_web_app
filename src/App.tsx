import React from 'react';
import MyDataTable from './components/user_table.tsx';
import './App.css';
import { useThemeParams } from '@vkruglikov/react-telegram-web-app';

export const App: React.FC = () => {
    const [colorScheme] = useThemeParams();

    const themeClass = colorScheme === 'dark' ? 'dark-theme' : 'light-theme';
    console.log(themeClass);

    return (
        <div className={themeClass}>
            <MyDataTable />
        </div>
    );
};
