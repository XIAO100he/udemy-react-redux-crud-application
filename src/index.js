import React from 'react';
import ReactDOM from 'react-dom';
//Storeを作成する機能と、ミドルウェアを適用するための関数
import { createStore, applyMiddleware } from 'redux';
//作成したStoreをアプリ内の全コンポーネントに渡す機能
import { Provider } from 'react-redux';
//ミドルウェア。action createrがactionの代わりに関数を返すことができる。非同期処理が可能に
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';
// import serviceWorker  from 'serviceWorker';

//dev環境の時だけ利用するようにする
const enhancer = process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

ReactDOM.render(
  // 既存のコンポーネント(App)をPrividerコンポーネントでラップし、store属性に定数storeを渡す
  // これによりアプリ内の全コンポーネントでstoreを使うことができる（親→子、子→孫　とする必要がない
  <MuiThemeProvider>
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path="/events/new" component={EventsNew} />
          <Route path="/events/:id" component={EventsShow} />
          <Route path="/" component={EventsIndex} />
          <Route path="/events" component={EventsIndex} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
// serviceWorker();
