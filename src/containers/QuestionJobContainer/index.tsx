import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const QuestionJobContainer = React.lazy(() => import('./QuestionJobContainer'));

export default (props: any) => {
  return (
    <React.Suspense fallback={<div />}>
      <QuestionJobContainer {...props} />
    </React.Suspense>
  );
};
