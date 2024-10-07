import React, { useContext, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Context } from "../main.tsx";
import { ClipLoader } from 'react-spinners';
import WebApp from '@twa-dev/sdk';

const MyDataTable: React.FC = observer(() => {
    const { store } = useContext(Context);
    const tableRef = useRef<HTMLDivElement | null>(null); // Реф для контейнера таблицы

    useEffect(() => {
        store.fetchUsers();
    }, [store]);

    const user = WebApp.initDataUnsafe.user?.username;

    // Определение класса темы на основе контекста или другой логики
    const themeClass = WebApp.colorScheme === 'dark' ? 'dark' : 'light';

    useEffect(() => {
        // Проверяем, если данные загружены
        if (store.users.length > 0 && user) {
            // Находим индекс строки с текущим пользователем
            const userIndex = store.users.findIndex(u => u.tg_username === user);
            
            if (userIndex !== -1) {
                // Прокручиваем к строке с пользователем
                const rowElement = document.getElementById(`user-row-${userIndex}`);
                rowElement?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }, [store.users, user]);

    if (store.loading) return (
        <div className={`loader-container ${themeClass}`}>
            <ClipLoader color="currentColor" size={150} />
        </div>
    );

    // Функция для отображения аватарки и никнейма
    const representativeBodyTemplate = (rowData: { tg_username: string; imgsrc: string }, options: { rowIndex: number }) => {
        return (
            <div id={`user-row-${options.rowIndex}`} className="flex items-center gap-2">
                <img
                    alt="Avatar"
                    src={rowData.imgsrc || 'https://via.placeholder.com/32'}
                    width="64"
                    height="64"
                    className={`rounded-full border ${themeClass === 'dark' ? 'border-avatar-border-dark' : 'border-avatar-border-light'}`}
                />
                <span>{rowData.tg_username}</span>
            </div>
        );
    };

    // Функция для отображения медалей и рейтинга
    const rankTemplate = (rowData: { rank: number }) => {
        let medalIcon = null;

        if (rowData.rank === 1) {
            medalIcon = "🥇"; // Золотая медаль
        } else if (rowData.rank === 2) {
            medalIcon = "🥈"; // Серебряная медаль
        } else if (rowData.rank === 3) {
            medalIcon = "🥉"; // Бронзовая медаль
        }

        return (
            <div className="flex items-center gap-2">
                {medalIcon ? (
                    <span className="text-xl">{medalIcon}</span>
                ) : (
                    <span>{rowData.rank}</span>
                )}
            </div>
        );
    };

    // Функция для отображения баланса с эмодзи алмаза
    const balanceTemplate = (rowData: { balance: number }) => {
        return (
            <div className="flex items-center gap-2">
                <span>{rowData.balance}</span>
                <span className="text-xl">💎</span>
            </div>
        );
    };

    return (
        <div ref={tableRef} className={`overflow-x-auto ${themeClass}`}>
            <DataTable
                value={store.users}
                showGridlines
                tableStyle={{ minWidth: '10rem' }}
                className="min-w-full"
            >
                <Column field="rank" header="Rank" body={rankTemplate} />
                <Column field="tg_username" body={representativeBodyTemplate} header="Username" />
                <Column field="balance" header="Balance" body={balanceTemplate} sortable />
            </DataTable>
        </div>
    );
});

export default MyDataTable;
