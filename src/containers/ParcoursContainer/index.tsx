import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const ParcoursContainer = React.lazy(() => import('./ParcoursContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <ParcoursContainer {...props} />
    </React.Suspense>
  );
};
