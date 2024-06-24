export interface UserInfoProps {
  user: {
    avatarUrl: string,
    name: string
  }
}

export interface User {
  avatarUrl: string,
  name: string
}

const UserInfo = (props: UserInfoProps) => {
  return (
    <div className='user'>
      <img
        className='user-image'
        src={props.user.avatarUrl}
        alt={`${props.user.name} avatar`}
      />
      <div className='user-name'>{props.user.name}</div>
    </div>
  )
}

export default UserInfo
