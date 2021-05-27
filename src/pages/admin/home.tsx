import React from 'react';

import { AdminTools } from '@/components/components';

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <AdminTools />
        </div>
      </>
    );
  }
}

export default Home;
