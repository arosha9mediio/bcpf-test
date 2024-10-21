// utils
import ReactMarkdown from "react-markdown";
import "./highlight";
// markdown plugins
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { MarkdownProps } from "./types";

// ----------------------------------------------------------------------
export default function Markdown({ ...other }: MarkdownProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeRaw,
        rehypeHighlight,
        [remarkGfm, { singleTilde: false }],
      ]}
      components={components}
      {...other}
    />
  );
}
// ----------------------------------------------------------------------

const components = {
  img: ({ ...props }) => <img alt={props.alt} {...props} />,
  a: ({ ...props }) => {
    const isHttp = props.href.includes("http");

    return isHttp ? (
      <a target="_blank" rel="noopener" {...props}>
        {props.children}
      </a>
    ) : (
      <a href={props.href} {...props}>
        {props.children}
      </a>
    );
  },
};
