import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    const { income, expense, total } = useMemo(() => {
        const amounts = transactions.map(t => t.type === 'expense' ? -t.amount : t.amount);

        const income = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => acc + item, 0)
            .toFixed(2);

        const expense = (amounts
            .filter(item => item < 0)
            .reduce((acc, item) => acc + item, 0) * -1)
            .toFixed(2);

        const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

        return { income, expense, total };
    }, [transactions]);

    return (
        <div className="balance-container">
            <div className="main-balance">
                <h4>Your Balance</h4>
                <h1>${total}</h1>
            </div>
            <div className="inc-exp-container">
                <div>
                    <h4>Income</h4>
                    <p className="money plus">+${income}</p>
                </div>
                <div>
                    <h4>Expense</h4>
                    <p className="money minus">-${expense}</p>
                </div>
            </div>
        </div>
    );
};

export default Balance;