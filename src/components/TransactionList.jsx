import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
    const { transactions, deleteTransaction } = useContext(GlobalContext);

    return (
        <div className="list-container">
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <li key={transaction.id} className={transaction.type === 'income' ? 'plus' : 'minus'}>
                        {transaction.text}
                        <span>{transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}</span>
                        <button
                            onClick={() => deleteTransaction(transaction.id)}
                            className="delete-btn"
                        >x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;