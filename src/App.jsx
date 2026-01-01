import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import Balance from './components/Balance';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import ExportButton from './components/ExportButton';

function App() {
  return (
    <GlobalProvider>
      <div className="app-container">
        <div className="header-row">
          <h2>Than Finance Tracker</h2>
          <ExportButton />
        </div>

        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="left-col">
            <Balance />
            <br />
            <TransactionForm />
          </div>

          {/* Right Column */}
          <div className="right-col">
            <IncomeExpenseChart />
            <br />
            <TransactionList />
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;