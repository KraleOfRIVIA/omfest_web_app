import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Context } from "../main.tsx";
import { ClipLoader } from 'react-spinners';
import WebApp from '@twa-dev/sdk';

const MyDataTable: React.FC = observer(() => {
    const { store } = useContext(Context);
    const themeClass = WebApp.colorScheme === 'dark' ? 'dark' : 'light';

    useEffect(() => {
        store.fetchUsers();
    }, [store]);

    const user = WebApp.initDataUnsafe.user?.username;

    if (!user) {
        return (
            <div className={`loader-container ${themeClass}`}>
                <ClipLoader color="currentColor" size={150} />
            </div>
        );
    }
    
    const frozenUsers = user 
        ? store.users.filter(u => u.tg_username.toLowerCase() === user.toLowerCase()) 
        : [];

    const otherUsers = store.users.filter(u => u.tg_username.toLowerCase() !== user.toLowerCase());

    if (store.loading) {
        return (
            <div className={`loader-container ${themeClass}`}>
                <ClipLoader color="currentColor" size={150} />
            </div>
        );
    }

    const representativeBodyTemplate = (rowData: { tg_username: string; imgsrc: string }) => {
        return (
            <div className="flex items-center gap-2" style={{ width: '100%' }}>
                <img
                    alt="Avatar"
                    src={rowData.imgsrc || 'https://via.placeholder.com/32'}
                    width="64"
                    height="64"
                    className={`rounded-full border ${themeClass === 'dark' ? 'border-avatar-border-dark' : 'border-avatar-border-light'}`}
                    style={{ flexShrink: 0 }}
                />
                <span
                    style={{
                        maxWidth: '120px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {rowData.tg_username}
                </span>
            </div>
        );
    };

    const rankTemplate = (rowData: { rank: number }) => {
        let medalIcon = null;
        if (rowData.rank === 1) medalIcon = "🥇";
        else if (rowData.rank === 2) medalIcon = "🥈";
        else if (rowData.rank === 3) medalIcon = "🥉";

        return (
            <div className="flex items-center gap-2">
                {medalIcon ? <span className="text-xl">{medalIcon}</span> : <span>{rowData.rank}</span>}
            </div>
        );
    };

    const balanceTemplate = (rowData: { balance: number }) => {
        return (
            <div className="flex items-center gap-2">
                <span>{rowData.balance}</span>
                <span className="text-xl">💎</span>
            </div>
        );
    };

    return (
        <div className={`overflow-x-auto ${themeClass}`} style={{ height: WebApp.viewportHeight, overflowY: 'auto' }}> {/* Ограничение высоты */}
            <DataTable
                value={otherUsers} 
                frozenValue={frozenUsers} 
                scrollable 
                scrollHeight="flex"
                showGridlines
            >
                <Column field="rank" header="Rank" body={rankTemplate} />
                <Column field="tg_username" body={representativeBodyTemplate} header="Username" />
                <Column field="balance" header="Balance" body={balanceTemplate} sortable />
            </DataTable>
        </div>
    );
});

export default MyDataTable;
