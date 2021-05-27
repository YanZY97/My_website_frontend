import React from 'react';
import Login from '@/components/login';

export default () => {
  return (
    <>
      <div style={{ height: '100%' }}>
        <Login onlyAdmin={true} />
      </div>
    </>
  );
};
