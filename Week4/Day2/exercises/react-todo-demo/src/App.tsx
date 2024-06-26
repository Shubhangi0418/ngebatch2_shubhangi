import ListToDo from "./components/ListToDo";

const App = () => {
  // eslint-disable-next-line
  const todos = [
    {
      id: 1,
      task: "Walk the Dog",
      complete: false,
    },
    {
      id: 2,
      task: "Feed the Cat",
      complete: true,
    },
    {
      id: 3,
      task: "read a book",
      complete: false,
    },
  ];

  return (
    <div>
      <h1>Todo</h1>
      {/* your code goes here... */}
      <ListToDo todos={todos} />
    </div>
  );
};

export default App;
