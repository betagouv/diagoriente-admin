import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const ContextContainer = React.lazy(() => import('./ContextContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <ContextContainer {...props} />
    </React.Suspense>
  );
};
