import React, { useState, useEffect } from "react";
import styles from "./comment.module.css";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { format } from 'timeago.js';

const Comment = ({ dataIn, c, find, setC, setData }) => {
  const [show, setShow] = useState(false);
  const [com, setCom] = useState("");
  const [reply, setReply] = useState(false);

  useEffect(() => {
    find();
  }, [show]);

  const search = (id, res, data, p) => {
    if (id === data.id) {
      if (data.replies) {
        data.replies = [...data.replies, p];
      } else {
        data.replies = [p];
      }
      return;
    }
    if (data.replies) {
      for (let i = 0; i < data.replies.length; i++) {
        search(id, res + `.replies[${i}]`, data.replies[i], p);
      }
    }
  };

  const postComment = async (id) => {
    var main;
    let payload = {
      id: uuid(),
      author: "Deependra",
      body: com,
      timestamp: new Date(Date.now())[Symbol.toPrimitive]("string"),
      points: Math.ceil(Math.random() * 10),
      replies: [],
    };
    setCom("")
    await axios
      .get("https://deependra-heroku-test-app.herokuapp.com/comments/1")
      .then(({ data }) => {
        main = data;
        search(id, "", main, payload);
        return main;
      });
    setData(main);
    setShow(false)
    await axios
      .patch("https://deependra-heroku-test-app.herokuapp.com/comments/1", main)
      .then((res) => console.log(res));
  };

  const commentThis = () => {
    postComment(dataIn.id);
    setC((p) => p + 1);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.labels}>
        <h4>{dataIn.author}</h4>
        <p className={styles.label}>{dataIn.points} points</p>
        <p className={styles.label}>{format(dataIn.timestamp)}</p>
      </div>
      <h4>{dataIn.body}</h4>
      {show &&
        dataIn.replies &&
        dataIn.replies.map((i) => (
          <Comment
            dataIn={i}
            key={i.id}
            setC={setC}
            find={find}
            setData={setData}
          />
        ))}
      <div className={styles.labels}>
        <p onClick={() => setShow((p) => !p)} className={styles.label}>
          <h1>{show ? "-" : "+"}</h1>
        </p>
        <p className={styles.label} onClick={() => setReply((p) => !p)}>
          Reply
        </p>
        <p className={styles.label}>Share</p>
        <p className={styles.label}>Report</p>
        <p className={styles.label}>Save</p>
      </div>
      {reply && (
        <>
          <input
            type="text"
            value={com}
            onChange={(e) => setCom(e.target.value)}
            placeholder="type something..."
            className={styles.inp}
          />
          <button className={styles.btn} onClick={() => commentThis()}>Comment</button>
        </>
      )}
    </div>
  );
};

export default Comment;
