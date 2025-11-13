import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBorrowers, setPage } from '../redux/slices/borrowersSlice';
import Table from '../components/Table';
import BorrowerModal from '../components/BorrowerModal';
import StatsCard from '../components/StatsCard';

export default function Dashboard(){
  const dispatch = useDispatch();
  const { items, status, error, total, page, limit } = useSelector(s => s.borrowers);
  const [query,setQuery] = useState('');
  const [sort,setSort] = useState('name');
  const [selected,setSelected] = useState(null);

  useEffect(()=>{
    dispatch(fetchBorrowers({page,limit}));
  },[dispatch,page,limit]);

  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a,b)=> sort==='name'? a.name.localeCompare(b.name) : b.amountDue - a.amountDue);

  const overdueCount = items.filter(i => i.status==='Overdue').length;
  const totalDue = items.reduce((s,i)=> s + i.amountDue, 0);

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <StatsCard title='Total Borrowers' value={total || '-'} subtitle='From mock API' />
        <StatsCard title='Overdue' value={overdueCount} subtitle='Accounts overdue' />
        <StatsCard title='Total Due' value={'₹' + totalDue.toLocaleString()} subtitle='Aggregated amount' />
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search borrowers...' className='px-3 py-2 border rounded w-64 dark:bg-gray-700' />
          <select value={sort} onChange={e=>setSort(e.target.value)} className='px-2 py-2 border rounded dark:bg-gray-700'>
            <option value='name'>Sort by Name</option>
            <option value='amount'>Sort by Amount</option>
          </select>
        </div>
        <div className='flex items-center gap-3'>
          <button className='px-3 py-2 bg-white/80 dark:bg-gray-800 border rounded' onClick={()=>dispatch(fetchBorrowers({page,limit}))}>Refresh</button>
          <div className='text-sm text-gray-500'>Page {page}</div>
        </div>
      </div>

      {status==='loading' && <div className='p-6 text-center'>Loading...</div>}
      {status==='failed' && <div className='p-6 text-red-500'>Error: {error}</div>}

      <Table rows={filtered} onRowClick={r=>setSelected(r)} />

      <div className='flex items-center justify-between mt-4'>
        <div className='text-sm text-gray-500'>Showing {items.length} of {total}</div>
        <div className='flex gap-2'>
          <button onClick={()=> dispatch(setPage(Math.max(1,page-1)))} disabled={page===1} className='px-3 py-2 border rounded'>Prev</button>
          <button onClick={()=> dispatch(setPage(page+1))} className='px-3 py-2 border rounded'>Next</button>
        </div>
      </div>

      {selected && <BorrowerModal item={selected} onClose={()=>setSelected(null)} />}
    </div>
  );
}
