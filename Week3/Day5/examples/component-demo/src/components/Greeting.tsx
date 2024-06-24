export interface GreetingProps {
  name: string,
  isBirthday: boolean
}

const Greeting = (props: GreetingProps) => {
  return (
    <div>
      <h1>Hello {props.name}</h1>
      {props.isBirthday && <p>Happy Birthday to you!</p>}
    </div>
  )
}

export default Greeting
