import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InbizImageSearchUpload } from '../.';
import '../src/index.less';

const App = () => {
  return (
    <div>
      <InbizImageSearchUpload />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));