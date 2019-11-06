import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const AdvisorContainer = React.lazy(() => import('./FormationContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <AdvisorContainer {...props} />
    </React.Suspense>
  );
};
