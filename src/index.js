import React from 'react';
import ReactDOM from 'react-dom';
//Storeを作成する機能と、ミドルウェアを適用するための関数
import { createStore, applyMiddleware } from 'redux';
//作成したStoreをアプリ内の全コンポーネントに渡す機能
import { Provider } from 'react-redux';
//ミドルウェア。action createrがactionの代わりに関数を返すことができる。非同期処理が可能に
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
// import serviceWorker  from 'serviceWorker';

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  // 既存のコンポーネント(App)をPrividerコンポーネントでラップし、store属性に定数storeを渡す
  // これによりアプリ内の全コンポーネントでstoreを使うことができる（親→子、子→孫　とする必要がない）
  <Provider store={ store }>
    <BrowserRouter>
      <Switch>
        <Route exact path="/events/new" component={EventsNew} />
        <Route exact path="/" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
// serviceWorker();
