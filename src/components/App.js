import React, {Component} from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions';

class App extends Component {
  render(){
    const props = this.props
  return(
    <React.Fragment>
      <div>value: { props.value }</div>
      <button onClick={ props.increment }>+1</button>
      <button onClick={ props.decrement }>-1</button>
    </React.Fragment>
    )
  }
}

//stateとactionを結びつける

//mapStateToProps
//Stateの情報からこのComponentで必要な情報を取り出し、Component内のpropsとしてmappingする機能
//引数にstateを持ち、どんな状態を返り値にするかを指定
const mapStateToProps = state => ({ value: state.count.value })

//mapDispatchToProps
//あるactionが発生した時にreducerにtypeに応じた状態遷移を実行させる＝dispatch関数
//このdispatch関数を引数に置いてこのComponent内で必要なdispatchを宣言する
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
