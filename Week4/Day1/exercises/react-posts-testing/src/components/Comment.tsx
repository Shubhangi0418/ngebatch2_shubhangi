import React from 'react'
import UserInfo, { User } from './UserInfo'

export interface CommentProps {
  author: User,
  text: string,
  date: string
}

const Comment = (props: CommentProps) => {
  return (
    <div className='comment'>
      <UserInfo user={props.author} />

      <div className='comment-text'>{props.text}</div>

      <div className='comment-date'>{props.date}</div>
    </div>
  )
}

export default Comment
