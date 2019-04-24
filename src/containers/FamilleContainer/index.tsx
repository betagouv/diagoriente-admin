import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const FamilleContainer = React.lazy(() => import('./FamilleContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <FamilleContainer {...props} />
    </React.Suspense>
  );
};
