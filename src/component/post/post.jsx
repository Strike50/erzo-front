import React, {useEffect, useState} from 'react';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {useParams} from "react-router";
import PostDisplay from "./postDisplay";
import CreatePost from "../create-post/create-post";

export const Post = props => {
    const {getPostById} = props;

   const [postId] = useParams();
   const [postObject, setPostObject] = useState({});

    useEffect(() => {
        if (postId !== null && postId !== undefined) {
            getPostById(postId)
                .then(post => {
                setPostObject(post);
            });
        }
    }, [postId, getPostById]);
    
    return postObject !== {} ? (
        <div>
            <PostDisplay id={postObject.id}
                         author={postObject.userId}
                         content={postObject.content}
                         creationDate={postObject.createdAt}
                         media={postObject.media}
                         reactions={postObject.reactions}
                         comments={postObject.comments} />
            <CreatePost />
        </div>
    ) : null;

    const creationDate = new Date(props.creationDate).toLocaleString();
    return (
        <Card className="card-post">
            <CardHeader>
                <div style={{float: "right", cursor: "pointer"}} onClick={onClickDeletePost}>&#x2716;</div>
                {authorDetail}
                <div>{`Publié le ${creationDate}`}</div>
            </CardHeader>
            <CardBody>
                <Row>{props.content}</Row>
                <Row>
                    <Col>
                        {checkMediaPlayer()}
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <Row>
                    <Col md="4">
                        <FontAwesomeIcon className="icon" icon="comment"/>
                        <span>{nbComment}</span>
                    </Col>
                    <Col md="4">
                        <FontAwesomeIcon className="icon" icon="retweet" color={idRT !== null ? 'green' : null} onClick={onClickRT}/>
                        <span>{nbRT}</span>
                    </Col>
                    <Col md="4">
                        <FontAwesomeIcon className="icon" icon="heart" color={idLike !== null ? 'red' : null} onClick={onClickLike}/>
                        <span>{nbLike}</span>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        getPostById: id => dispatch(actions.getPostById(id))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(Post)
