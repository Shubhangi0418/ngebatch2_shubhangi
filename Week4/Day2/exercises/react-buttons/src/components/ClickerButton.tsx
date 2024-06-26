export interface ClickerButtonProps {
  clicks: number;
  colour: string;
  handleClick: () => void;
}

const ClickerButton = (props: ClickerButtonProps) => (
  // Renders a HTML button element and attaches an onClick handler
  // The button body references the state (clicks) that has been passed from the parent
  // and therefore will always display the current value of clicks
  <>
    <button onClick={props.handleClick}>
      I've been clicked {props.clicks} times!
    </button>
    <p style={{ color: props.colour }} >This is the React state session</p>
  </>
);

export default ClickerButton;
