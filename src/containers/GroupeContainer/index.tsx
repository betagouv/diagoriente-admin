import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const GroupContainer = React.lazy(() => import('./GroupContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <GroupContainer {...props} />
    </React.Suspense>
  );
};