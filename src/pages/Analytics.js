import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBorrowers } from '../redux/slices/borrowersSlice';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import StatsCard from '../components/StatsCard';

export default function Analytics(){
  const dispatch = useDispatch();
  const { items, status } = useSelector(s => s.borrowers);

  useEffect(()=>{ dispatch(fetchBorrowers({page:1,limit:12})); },[dispatch]);

  const data = [
    { name: 'Active', value: items.filter(i=> i.status==='Active').length },
    { name: 'Overdue', value: items.filter(i=> i.status==='Overdue').length },
    { name: 'Paid', value: items.filter(i=> i.status==='Paid').length },
  ];
  const COLORS = ['#60a5fa','#f87171','#34d399'];

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <StatsCard title='Active' value={data[0].value} />
        <StatsCard title='Overdue' value={data[1].value} />
        <StatsCard title='Paid' value={data[2].value} />
      </div>

      <div className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow card-glass'>
        <h3 className='font-semibold mb-3'>Loan Status Distribution</h3>
        {status==='loading' ? <div>Loading chart...</div> :
          <div className='flex justify-center'>
            <PieChart width={350} height={300}>
              <Pie data={data} dataKey='value' cx='50%' cy='50%' outerRadius={100} label>
                {data.map((entry, idx) => <Cell key={idx} fill={COLORS[idx]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        }
      </div>
    </div>
  );
}
