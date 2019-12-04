import React from 'react';
import {Button, Form, Input} from "reactstrap";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

class CreatePost extends React.Component {

  state = {
    content: '',
    media: '',
  };

  handleContentChange = e => {
    this.setState({
      ...this.state,
      content: e.target.value
    })
  };

  handleMediaChange = e => {
    this.setState({
      ...this.state,
      media: e.target.value
    })
  };

  handleSubmitTweet = () => {
    console.log(this.state);
  };

  render() {
    return (
      <Form >
        <Input type="textarea" value={this.state.content} onChange={this.handleContentChange}/>
        <Input type="file" accept="image/*,video/*" value={this.state.media} onChange={this.handleMediaChange}/>
        <Button onClick={this.handleSubmitTweet}>Tweeter</Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTimeline: () => dispatch(actions.fetchTimeline())
  }
};

export default connect(null, mapDispatchToProps)(CreatePost);
