import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const UsersContainer = React.lazy(() => import('./UsersContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <UsersContainer {...props} />
    </React.Suspense>
  );
};
