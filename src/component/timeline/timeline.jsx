import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchTimeline} from './timeline.reducer';
import Post from '../post/post';

export const Timeline = (props)  => {

  useEffect(() => {
    props.fetchTimeline();
  });

  return props.listPost.map((post,i) => (
    <Post key={`post-${i}`} author={post.author} content={post.content} creationDate={post.creationDate} reactions={post.reactions}/>
  ));
};

const mapStateToProps = (storeState) => ({
  listPost: storeState.timeline.listPost
});

const mapDispatchToProps = { fetchTimeline };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

