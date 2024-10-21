"use client";
import s3UploaderPreSigned from "@/app/[locale]/(routes)/components/s3-presigned";
import "@/components/markdown/highlight";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import { getImagePath } from "@/utils/aws";
import Toolbar, { formats } from "./toolbar";
import { EditorProps } from "./types";
import htmlEditButton from "quill-html-edit-button";
import { Quill } from "react-quill";
import "./editor.css";

Quill.register("modules/htmlEditButton", htmlEditButton);

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

// ----------------------------------------------------------------------

function imageHandler() {
  const editor = this.quill;
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      const uploadInfo = await s3UploaderPreSigned(
        file,
        `blog/editor/${uuidv4()}`,
        "images",
      );
      const uri = uploadInfo?.fields?.Key;
      editor.insertEmbed(editor.getSelection(), "image", getImagePath(uri));
    }
  };
}

export default function Editor({
  id = "minimal-quill",
  error,
  simple = true,
  toolBar = true,
  helperText,
  ...other
}: EditorProps) {
  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        image: imageHandler,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
    htmlEditButton: {
      msg: "Edit the content in HTML format",
      okText: "Ok",
      cancelText: "Cancel",
      buttonHTML: "HTML",
      buttonTitle: "Show HTML source",
      syntax: false,
      prependSelector: "div#myelement",
      editorModules: {},
    },
  };

  return (
    <div className="flex flex-col h-full">
      {toolBar && <Toolbar id={id} isSimple={simple} />}
      <ReactQuill
        modules={modules}
        formats={formats}
        className="min-h-[250px] h-full"
        placeholder="Write something awesome..."
        {...other}
      />
      {helperText && helperText}
    </div>
  );
}
