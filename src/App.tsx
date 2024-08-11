import React from 'react';
import MyDataTable from './components/user_table.tsx';
import {MainButton, useShowPopup, useThemeParams} from '@vkruglikov/react-telegram-web-app';

export const App: React.FC = () => {
    const [colorScheme] = useThemeParams();
    const showPopup = useShowPopup();

    const handleClick = () =>
        showPopup({
            message: 'Hello, I am popup',
        });

    const themeClass = colorScheme === 'dark' ? 'dark-theme' : 'light-theme';
    console.log(themeClass);

    return (
        <div className={themeClass}>
            <MainButton text="SHOW POPUP" onClick={handleClick} />
            <MyDataTable />
        </div>
    );
};
