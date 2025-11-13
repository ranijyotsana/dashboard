import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar(){
  const loc = useLocation();
  const [dark,setDark] = React.useState(() => document.documentElement.classList.contains('dark'));
  React.useEffect(()=>{ document.documentElement.classList.toggle('dark', dark); },[dark]);

  return (
    <header className='bg-white/60 dark:bg-gray-900/60 backdrop-blur sticky top-0 z-30 shadow-sm'>
      <div className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <div style={{background: 'var(--brand-gradient)'}} className='rounded-full p-2'>
            <svg className='w-6 h-6 text-white' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 12h18' stroke='white' strokeWidth='2' strokeLinecap='round'/></svg>
          </div>
          <div>
            <h1 className='font-bold text-lg'>E‑Solve Mini Dashboard</h1>
            <p className='text-xs text-gray-500 dark:text-gray-400'>Loans & Collections</p>
          </div>
        </div>

        <nav className='flex items-center gap-4'>
          <Link className={'px-3 py-2 rounded ' + (loc.pathname==='/'? 'bg-slate-100 dark:bg-gray-800' : 'hover:bg-slate-50 dark:hover:bg-gray-800')} to='/'>Dashboard</Link>
          <Link className={'px-3 py-2 rounded ' + (loc.pathname==='/analytics'? 'bg-slate-100 dark:bg-gray-800' : 'hover:bg-slate-50 dark:hover:bg-gray-800')} to='/analytics'>Analytics</Link>
          <button onClick={() => setDark(d => !d)} className='ml-3 px-3 py-2 rounded border dark:border-gray-700'>
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </div>
    </header>
  );
}
