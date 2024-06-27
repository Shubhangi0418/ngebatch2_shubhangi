import React from "react";

interface userInfoProps {
  name: string;
  url: string;
}

export default function UserInfo({ name, url }: userInfoProps) {
  return (
    <div className="user">
      <img className="user-image" src={url} alt={name} />
      <div className="user-name">{name}</div>
    </div>
  );
}
