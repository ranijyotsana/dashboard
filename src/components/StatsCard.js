import React from 'react';

export default function StatsCard({title, value, subtitle, children}){
  return (
    <div className='p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 card-glass border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-sm text-gray-500 dark:text-gray-300'>{title}</div>
          <div className='text-2xl font-bold mt-1'>{value}</div>
          {subtitle && <div className='text-xs text-gray-400 mt-1'>{subtitle}</div>}
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}