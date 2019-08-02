import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const EnvironmentContainer = React.lazy(() => import('./EnvironmentContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <EnvironmentContainer {...props} />
    </React.Suspense>
  );
};
