import { CheckSquare, SquareX } from "lucide-react"; // Assuming these are icons you use

type ActiveFormatterProps = {
  value: string | number;
};

const ActiveFormatter: React.FC<ActiveFormatterProps> = ({ value }) => {
  return (
    <div>{value ? <CheckSquare color="green" /> : <SquareX color="red" />}</div>
  );
};

export default ActiveFormatter;
