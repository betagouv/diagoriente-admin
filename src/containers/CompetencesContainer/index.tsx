import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const CompetencesContainer = React.lazy(() => import('./CompetencesContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <CompetencesContainer {...props} />
    </React.Suspense>
  );
};
