import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const AproposContainer = React.lazy(() => import('./aproposContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <AproposContainer {...props} />
    </React.Suspense>
  );
};
