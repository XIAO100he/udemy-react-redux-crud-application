import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Link } from 'react-router-dom' 
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { readEvents } from '../actions';

class EventsIndex extends Component {
  //componentがmountされた際に必ず呼ばれるメソッド
  //よってここに外部APIの情報取得をする関数を実行させる（中身はaction)に記載
  componentDidMount() {
    this.props.readEvents()
  }
  
  renderEvents() {
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableRowColumn>{event.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{event.body}</TableRowColumn>
      </TableRow>
    ))
  }
  render(){
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12 
    }
    return (
      <React.Fragment>
        <FloatingActionButton style={style} containerElement={<Link to="/events/new" />}>
          <ContentAdd />
        </FloatingActionButton>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Body</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderEvents()}
          </TableBody>
        </Table>
      </React.Fragment>
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
