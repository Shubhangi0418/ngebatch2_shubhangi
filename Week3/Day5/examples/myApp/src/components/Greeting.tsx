export default function NewGreeter(): JSX.Element {
  return <h2>Welcome to the world of React</h2>;
}

/* export function Hello() {
  return <h3>Hello</h3>
}
 */
/* export const Hello = function() {
  return <h3>Hello</h3>
} */
export const Hello = (): JSX.Element => {
  const message = "Hello User";
  const getQuote = () => "Be the change you wish to see in the world.";
  const emp = { id: 1, name: "Vishnu", skills: ["Java", "Spring", "React"] };

  function getGreeting(user?: string): JSX.Element {
    if (user) return <div>Hello {user}!</div>;
    return <div>Hello Stranger!</div>;
  }
  function showCart(): JSX.Element {
    const cart = ["Book1", "Gadget1", "Grocery1", "Grocery2"];
    return cart.length > 0 ? (
      <table className="cartitem">
        <thead>
          <tr>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, id) => (
            <tr key={id}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Cart is empty</p>
    );
  }

  return (
    <>
      <h3>{"Message to you: " + message}</h3>
      <p>{getQuote()}</p>
      <p>{emp.name}</p>
      <p>{emp.skills}</p> {/* Raw array */}
      <ul>
        {" "}
        {/* Array transformed in to a list */}
        {emp.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      {getGreeting(emp.name)}
      {getGreeting()}
      <div>{showCart()}</div>
      <p>
        {emp.skills.length > 0
          ? "Employee has " + emp.skills.length + " skills"
          : "Skill list is empty"}
      </p>
      {emp.skills.length > 1 && "Eligible for mycomp assessment"}
    </>
  );
};

// More than 1 named export allowed
// But 1 default export from a module file
// export : Named export
// export default : Named export
// Importing named export members with {}
// import {Greeter} from "./Greeter"
// Importing default export members with {}
// import Greeter from "./Greeter"
// Import NewGreeter from "./Greeter"

// Importing both named and default
//import Greeter,{AnotherGreeter,Header,Footer} from ...
