import React, {Component} from 'react';
import { connect } from 'react-redux';
import { readEvents } from '../actions';
import _ from 'lodash'

class EventsIndex extends Component {
  //componentがmountされた際に必ず呼ばれるメソッド
  //よってここに外部APIの情報取得をする関数を実行させる（中身はaction)に記載
  componentDidMount() {
    this.props.readEvents()
  }
  
  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ))
  }
  render(){
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {this.renderEvents()}
        </tbody>
      </table>
      )
  }
}

//stateとactionを結びつける

//mapStateToProps
//Stateの情報からこのComponentで必要な情報を取り出し、Component内のpropsとしてmappingする機能
//引数にstateを持ち、どんな状態を返り値にするかを指定
const mapStateToProps = state => ({ events: state.events })

//mapDispatchToProps
//あるactionが発生した時にreducerにtypeに応じた状態遷移を実行させる＝dispatch関数
//このdispatch関数を引数に置いてこのComponent内で必要なdispatchを宣言する
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
