import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const JobsContainer = React.lazy(() => import('./JobsContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <JobsContainer {...props} />
    </React.Suspense>
  );
};
