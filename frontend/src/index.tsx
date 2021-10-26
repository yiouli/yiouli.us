import React from 'react';
import ReactDOM from 'react-dom';

import Individual from './components/individual';

declare global {
  var pageId: number;
}

ReactDOM.render(
  <Individual pageId={window.pageId} />,
  document.getElementById('root'),
);