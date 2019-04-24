import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const SecteurContainer = React.lazy(() => import('./SecteurContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <SecteurContainer {...props} />
    </React.Suspense>
  );
};
