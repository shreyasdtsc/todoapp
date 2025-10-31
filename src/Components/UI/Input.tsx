import Button from "@mui/material/Button";

// Define the props interface
interface ToDoInputProps {
  input: string;
  setInput: (value: string) => void;
  addTask: () => void;
}

export default function Input({
  input,
  setInput,
  addTask,
}: ToDoInputProps): JSX.Element {
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter here"
        required
      />
      <Button variant="contained" onClick={addTask}>
        ADD
      </Button>
    </div>
  );
}
