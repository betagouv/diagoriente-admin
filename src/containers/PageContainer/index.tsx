import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const PageContainer = React.lazy(() => import('./pageContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <PageContainer {...props} />
    </React.Suspense>
  );
};
