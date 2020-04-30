import React from 'react';
import ReactDOM from 'react-dom';
//Storeを作成する機能
import { createStore} from 'redux';
//作成したStoreをアプリ内の全コンポーネントに渡す機能
import { Provider } from 'react-redux';

import './index.css';
import reducer from './reducers'
import App from './components/App';
import registerServiceWorker  from './registerServiceWorker';

const store = createStore(reducer)

ReactDOM.render(
  // 既存のコンポーネント(App)をPrividerコンポーネントでラップし、store属性に定数storeを渡す
  // これによりアプリ内の全コンポーネントでstoreを使うことができる（親→子、子→孫　とする必要がない）
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
