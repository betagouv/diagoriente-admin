import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const ThemesContainer = React.lazy(() => import('./ThemesContainer'));

export default (props: RouteComponentProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <ThemesContainer {...props} />
    </React.Suspense>
  );
};
