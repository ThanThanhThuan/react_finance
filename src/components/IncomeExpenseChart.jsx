import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2ecc71', '#e74c3c']; // Green for Income, Red for Expense

const IncomeExpenseChart = () => {
    const { transactions } = useContext(GlobalContext);

    // Optimization: Prepare chart data only when transactions change
    const data = useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);

        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);

        return [
            { name: 'Income', value: income },
            { name: 'Expense', value: expense }
        ];
    }, [transactions]);

    return (
        <div className="chart-container">
            <h3>Overview</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IncomeExpenseChart;