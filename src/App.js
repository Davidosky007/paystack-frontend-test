import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionForm from './TransactionForm';
import PaymentStatus from './PaymentStatus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionForm />} />
        <Route path="/payment-status/:reference" element={<PaymentStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
