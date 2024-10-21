import { ReactQuillProps } from "react-quill";
// @mui

// ----------------------------------------------------------------------

export interface EditorProps extends ReactQuillProps {
  error?: boolean;
  simple?: boolean;
  toolBar?: boolean;
  helperText?: React.ReactNode;
}
