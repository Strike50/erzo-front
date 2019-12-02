import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import Post from '../post/post';

class Timeline extends React.Component {

componentDidMount() {
  this.props.fetchTimeline();
};

render() {
  const listPost = this.props.listPost;
  return props.listPost.map((post,i) => (
      <Post key={`post-${i}`} author={post.author} content={post.content} creationDate={post.creationDate} reactions={post.reactions}/>
  ));
}

}

const mapStateToProps = (storeState) => ({
  listPost: storeState.timeline.listPost});

const mapDispatchToProps = dispatch => {
    return {
      fetchTimeline: () => dispatch(actions.fetchTimeline())
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

