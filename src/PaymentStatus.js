import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentStatus = () => {
  const { reference } = useParams();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

    const verifyTransaction = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/verify-transaction/${reference}`);
        setStatus(response.data.status === 'success' ? 'Payment Successful!' : 'Payment Failed.');
      } catch (err) {
        console.error(err);
        setStatus('Error verifying payment.');
      } finally {
        setLoading(false);
      }
    };

    verifyTransaction();
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center w-96">
        {loading ? <p>Verifying payment...</p> : <h2 className="text-2xl font-bold">{status}</h2>}
      </div>
    </div>
  );
};

export default PaymentStatus;
