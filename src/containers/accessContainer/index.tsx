import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const EnvironmentContainer = React.lazy(() => import('./AcessContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <EnvironmentContainer {...props} />
    </React.Suspense>
  );
};
