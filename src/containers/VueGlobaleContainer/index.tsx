import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const VueGlobaleContainer = React.lazy(() => import('./VueGlobaleContainer'));

export default (props: any) => {
  return (
    <React.Suspense fallback={<div />}>
      <VueGlobaleContainer {...props} />
    </React.Suspense>
  );
};
