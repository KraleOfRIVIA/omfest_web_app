import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const MyDataTable = () => {
    // Пример данных для таблицы
    const data = [
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 34 },
        { id: 3, name: 'George Johnson', age: 45 }
    ];

    return (
        <div className="">
            <DataTable value={data} tableStyle={{minWidth:'50rem'}}>
                <Column field="id" header="ID" />
                <Column field="name" header="Name" />
                <Column field="age" header="Age" />
            </DataTable>
        </div>
    );
};

export default MyDataTable;
