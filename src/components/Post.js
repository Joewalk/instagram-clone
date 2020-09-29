import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase";
import firebase from "firebase";

function Post({ username, user, caption, imageURL, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={`${username}`}
          src="/static/images/avatar/1.png"
        />
        <h4>{`${username}`}</h4>
      </div>
      <img className="post__image" alt="" src={`${imageURL}`} />
      <h4 className="post__text">
        <strong>{`${username} :`} </strong>
        {caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} </strong>
            {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__form" onSubmit={postComment}>
          <input
            className="post__input"
            type="text"
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" onSubmit={postComment} className="post__button">
            send
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
