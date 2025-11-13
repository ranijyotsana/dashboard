import React, {useEffect, useState} from 'react';

export default function BorrowerModal({item, onClose}){
  const [status, setStatus] = useState(item.status);
  useEffect(()=>{
    let stages = ['Payment in progress','Payment received','Clearing'];
    let i = 0;
    const t = setInterval(()=>{
      i = (i+1) % stages.length;
      setStatus(stages[i]);
    }, 3000);
    return () => clearInterval(t);
  },[]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-11/12 max-w-md bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg'>
        <div className='flex justify-between items-start mb-4'>
          <h3 className='text-lg font-semibold'>{item.name}</h3>
          <button onClick={onClose} className='text-gray-500'>✖</button>
        </div>
        <div className='space-y-2 text-sm text-gray-700 dark:text-gray-200'>
          <div><strong>Loan ID:</strong> {item.loanId}</div>
          <div><strong>Amount Due:</strong> ₹{item.amountDue.toLocaleString()}</div>
          <div><strong>Due Date:</strong> {item.dueDate}</div>
          <div><strong>Current Status:</strong> <span className='font-medium text-blue-600'>{status}</span></div>
          <div className='pt-3'>
            <h4 className='font-semibold'>Borrower Info</h4>
            <div className='text-xs text-gray-500'>{item.raw?.email} • {item.raw?.phone}</div>
          </div>
        </div>
        <div className='mt-4 flex justify-end'>
          <button onClick={onClose} className='px-4 py-2 bg-slate-100 dark:bg-gray-700 rounded'>Close</button>
        </div>
      </div>
    </div>
  );
}
