import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!userName || !userEmail || !amount) {
      setError('Please fill all fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/initialize-transaction`,
        {
          email: userEmail,
          amount: amount * 100, // Convert to kobo
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
            'Access-Control-Allow-Origin': '*'
          }
        }
      );

      window.location.href = response.data.authorization_url;
    } catch (err) {
      console.error(err);
      setError('Error initializing transaction. Please try again.');
    } finally {
      setLoading(false);
    }

  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 mb-2 w-full rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 mb-2 w-full rounded"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount (NGN)"
          className="border p-2 mb-4 w-full rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handlePayment}
          className={`bg-blue-600 text-white w-full py-2 rounded ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
