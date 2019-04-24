import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const IntersetContainer = React.lazy(() => import('./interestsContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <IntersetContainer {...props} />
    </React.Suspense>
  );
};
