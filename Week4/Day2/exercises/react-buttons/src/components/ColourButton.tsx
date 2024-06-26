export interface ColourButtonProps {
  colour?: string,
  handleClick?: () => void
}

const ColourButton = (props: ColourButtonProps) => {
  console.log('ColourButton called, props.colour=', props.colour)
  console.log('ColourButton called, props.handleClick=', props.handleClick)
  // Renders a HTML button element
  const styleAttribute = { 
    backgroundColor: props.colour
  }
  
  return (
    <button style={styleAttribute} onClick={props.handleClick}>My colour is {props.colour}</button>
  )
}

export default ColourButton
