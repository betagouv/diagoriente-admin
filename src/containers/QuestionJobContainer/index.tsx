import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const QuestionJobContainer = React.lazy(() => import('./QuestionJobContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <QuestionJobContainer {...props} />
    </React.Suspense>
  );
};
