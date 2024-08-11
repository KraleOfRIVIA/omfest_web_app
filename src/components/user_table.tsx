import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Context } from "../main.tsx";
import { ClipLoader } from 'react-spinners';

const MyDataTable: React.FC = observer(() => {
    const { store } = useContext(Context);

    useEffect(() => {
        store.fetchUsers();
    }, [store]);

    if (store.loading) return (
        <div className="loader-container">
            <ClipLoader color="#348ADB" size={150} />
        </div>
    );

    // Функция для отображения аватарки и никнейма
    const representativeBodyTemplate = (rowData: { tg_username: string; imgsrc: string }) => {
        return (
            <div className="flex items-center gap-2">
                <img alt="Avatar" src={rowData.imgsrc || 'https://via.placeholder.com/32'} width="32" height="32" className="rounded-full" />
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
        <div className="overflow-x-auto">
            <DataTable
                value={store.users}
                showGridlines
                tableStyle={{ minWidth: '10rem' }}
                className="min-w-full"
            >
                <Column field="rank" header="Rank" body={rankTemplate} />
                <Column field="tg_username" body={representativeBodyTemplate} header="Telegram Username" />
                <Column field="balance" header="Balance" body={balanceTemplate} sortable />
            </DataTable>
        </div>
    );
});

export default MyDataTable;
