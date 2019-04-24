import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const HomeContainer = React.lazy(() => import('./HomeContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <HomeContainer {...props} />
    </React.Suspense>
  );
};
