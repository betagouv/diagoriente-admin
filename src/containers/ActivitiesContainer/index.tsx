import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const ActivitiesContainer = React.lazy(() => import('./ActivitiesContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <ActivitiesContainer {...props} />
    </React.Suspense>
  );
};
