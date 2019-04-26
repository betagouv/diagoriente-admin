import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const QuestionsContainer = React.lazy(() => import('./QuestionsContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <QuestionsContainer {...props} />
    </React.Suspense>
  );
};
