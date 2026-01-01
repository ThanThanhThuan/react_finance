import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const ExportButton = () => {
    const { transactions } = useContext(GlobalContext);

    const downloadCSV = () => {
        // 1. Define Headers
        const headers = ['ID,Description,Amount,Type'];

        // 2. Format rows
        const rows = transactions.map(t =>
            `${t.id},"${t.text}",${t.amount},${t.type}`
        );

        // 3. Combine
        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers, ...rows].join("\n");

        // 4. Create link and click it
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button className="btn-export" onClick={downloadCSV}>
            Download CSV
        </button>
    );
};

export default ExportButton;