import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// Initial state with some dummy data
const initialState = {
    transactions: JSON.parse(localStorage.getItem('transactions')) || [
        { id: 1, text: 'Freelance', amount: 1500, type: 'income' },
        { id: 2, text: 'Rent', amount: 800, type: 'expense' },
        { id: 3, text: 'Groceries', amount: 150, type: 'expense' },
    ]
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Persist to LocalStorage whenever transactions change
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
    }, [state.transactions]);

    function deleteTransaction(id) {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    function addTransaction(transaction) {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    );
};