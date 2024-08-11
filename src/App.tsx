import React from 'react';
import MyDataTable from './components/user_table.tsx';
import './App.css'; // Импортируйте ваш CSS-файл

export const App: React.FC = () => {
    return (
        <div>
            <MyDataTable />
        </div>
    );
};
