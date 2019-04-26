import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const ConstConatiner = React.lazy(() => import('./constConatiner'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <ConstConatiner {...props} />
    </React.Suspense>
  );
};
