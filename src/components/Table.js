import React from 'react';

export default function Table({rows, onRowClick}){
  return (
    <div className='overflow-x-auto rounded-lg shadow card-glass border border-gray-200 dark:border-gray-700'>
      <table className='min-w-full divide-y'>
        <thead className='bg-white/60 dark:bg-gray-800/60'>
          <tr className='text-left text-sm font-medium text-gray-700 dark:text-gray-200'>
            <th className='px-4 py-3'>Customer Name</th>
            <th className='px-4 py-3'>Loan ID</th>
            <th className='px-4 py-3'>Status</th>
            <th className='px-4 py-3'>Amount Due</th>
            <th className='px-4 py-3'>Due Date</th>
          </tr>
        </thead>
        <tbody className='text-sm'>
          {rows.map(r => (
            <tr key={r.id} onClick={() => onRowClick(r)} className='cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-700/40'>
              <td className='px-4 py-3'>{r.name}</td>
              <td className='px-4 py-3'>{r.loanId}</td>
              <td className='px-4 py-3'><span className={'px-2 py-1 rounded-full text-xs ' + (r.status==='Overdue'? 'bg-red-100 text-red-700' : r.status==='Paid'? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>{r.status}</span></td>
              <td className='px-4 py-3'>₹{r.amountDue.toLocaleString()}</td>
              <td className='px-4 py-3'>{r.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
