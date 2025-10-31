import Header from "../UI/Header";
import Input from "../UI/Input";
import List from "../UI/List";
import useToDoStore from "./zustandStore";

export default function ToDOZuStand(): JSX.Element {
  const {
    toDoList,
    input,
    setInput,
    addTask,
    updateTaskStatus,
    deleteTask,
  } = useToDoStore();

  return (
    <div>
      <Header toDoList={toDoList} />
      <Input input={input} setInput={setInput} addTask={addTask} />
      <List
        toDoList={toDoList}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
}
