import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../context/GlobalState';

const TransactionForm = () => {
    const { addTransaction } = useContext(GlobalContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const newTransaction = {
            id: uuidv4(),
            text: data.text,
            amount: +data.amount, // Convert string to number
            type: data.type
        };

        addTransaction(newTransaction);
        reset();
    };

    return (
        <div className="form-container">
            <h3>Add New Transaction</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Enter text..."
                        {...register("text", { required: "Description is required" })}
                    />
                    {errors.text && <span className="error">{errors.text.message}</span>}
                </div>

                <div className="form-control">
                    <label>Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Enter amount..."
                        {...register("amount", { required: "Amount is required", min: 0.01 })}
                    />
                    {errors.amount && <span className="error">Enter a valid amount</span>}
                </div>

                <div className="form-control">
                    <label>Type</label>
                    <select {...register("type")}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <button className="btn">Add Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;