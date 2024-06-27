import React from "react";
import UserInfo from "./UserInfo";

interface Comment {
  date: string;
  text: string;
  author: {
    name: string;
    avatarUrl: string;
  };
}
interface CommentProps {
  data: Comment;
}

export default function Comment({ data }: CommentProps) {
  return (
    <div>
      <div className="comment">
        <UserInfo name={data.author.name} url={data.author.avatarUrl} />

        <div className="comment-text">{data.text}</div>

        <div className="comment-date">{data.date}</div>
      </div>
    </div>
  );
}
