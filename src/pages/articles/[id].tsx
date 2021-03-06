import React from 'react';
import styles from './article.less';

import { Article } from '@/components/components'

export default ({ match }) => {
  return (
    <div>
      <Article id={match.params.id} />
    </div>
  );
}
