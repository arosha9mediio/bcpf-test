type FormHeaderLineProps = {
  text: string;
};

type FormHeaderLineType = (props: FormHeaderLineProps) => JSX.Element;

const FormHeaderLine: FormHeaderLineType = ({ text }) => {
  return (
    <div className="flex items-center mb-2">
      <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
      <div>{text}</div>
    </div>
  );
};

type FormHeaderProps = {
  title: string;
  items: string[];
};

type FormHeaderType = (props: FormHeaderProps) => JSX.Element;

const FormHeader = ({ contest, title, items }) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">{contest.title}</h1>
      {items.map((item, index) => (
        <FormHeaderLine key={index} text={item} />
      ))}
    </div>
  );
};

export { FormHeader };
export type { FormHeaderProps };
