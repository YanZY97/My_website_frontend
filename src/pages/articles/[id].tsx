import React from 'react';

import { Article } from '@/components/components'

export default ({ match }) => {
  document.body.scrollIntoView()

  return (
    <div style={{ height: "100%" }}>
      <Article id={match.params.id} />
    </div>
  );
}
