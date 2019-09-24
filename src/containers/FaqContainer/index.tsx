import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const FaqContainer = React.lazy(() => import('./faqContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <FaqContainer {...props} />
    </React.Suspense>
  );
};
