"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import s3UploaderPreSigned from "@/app/[locale]/(routes)/components/s3-presigned";
import { getImagePath } from "@/utils/aws";
import { Jodit } from "jodit-react";
import "./editor.css";
import { useTheme } from "next-themes";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface Editor2Props {
  placeholder?: string;
  value: string;
  onBlur: (value: string) => void;
}

const Editor2: React.FC<Editor2Props> = ({
  placeholder,
  value = "",
  onBlur,
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState<string>(value ? value : " ");
  const { theme, resolvedTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [joditTheme, setJoditTheme] = useState<string>("light");

  useEffect(() => {
    // Update the Jodit theme when Next.js theme changes
    setJoditTheme(resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  // ToDo: Move supporting function into separate util folder after the approval
  const stylePastedButton = (jodit: any) => {
    jodit.e.on("paste", (e: any) => {
      setTimeout(() => {
        const editorContent = jodit.value;
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = editorContent;
        const buttons = tempContainer.querySelectorAll("button");
        buttons.forEach(buttonElement => {
          buttonElement.style.backgroundColor = "black";
          buttonElement.style.color = "white";
          buttonElement.style.fontSize = "14px";
          buttonElement.style.paddingTop = "10px";
          buttonElement.style.paddingBottom = "10px";
          buttonElement.style.paddingLeft = "30px";
          buttonElement.style.paddingRight = "30px";
          buttonElement.style.borderRadius = "10px";
        });
        jodit.value = tempContainer.innerHTML;
      }, 1000);
    });
  };

  const insertImage = (editorInstance, url) => {
    const image = editorInstance.selection.j.createInside.element("img");
    image.setAttribute("src", url);
    editorInstance.selection.insertNode(image);
  };

  Jodit.plugins.add("stylePastedButton", stylePastedButton);

  const imageUpload = editorInstance => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async function () {
      const imageFile = input.files[0];

      if (!imageFile) {
        return;
      }

      if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
        return;
      }
      try {
        const uploadInfo = await s3UploaderPreSigned(
          imageFile,
          `blog/editor/${uuidv4()}`,
          "images",
        );
        const uri = uploadInfo?.fields?.Key;
        const imageUrl = getImagePath(uri);

        insertImage(editorInstance, imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }.bind(this);
  };

  const customImageUploadButton = () => {
    Jodit.defaultOptions.controls.uploadImage = {
      name: "Upload image to S3",
      iconURL: isDarkTheme
        ? "https://img.icons8.com/fluent-systems-filled/200/FFFFFF/picture.png"
        : "https://cdn-icons-png.flaticon.com/128/1837/1837526.png",
      exec: async editorInstance => {
        await imageUpload(editorInstance);
      },
    };
  };

  const config = useMemo(() => {
    customImageUploadButton();

    return {
      theme: joditTheme,
      defaultMode: 1,
      height: "500px",
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      readonly: false,
      cleanHTML: {
        replaceStyles: false,
        removeEmptyElements: false,
      },
      style: {
        table: "border: 1px solid black; border-collapse: collapse;",
        td: "border: 1px solid black;",
        th: "border: 1px solid black;",
      },
      createAttributes: {
        table: {
          style:
            "border: 1px solid black; border-collapse: collapse; width: 100%;",
        },
        tr: { style: "border: 1px solid black;" },
        td: { style: "border: 1px solid black;" },
        th: { style: "border: 1px solid black;" },

        ul: {
          style:
            "list-style-position: inside; list-style-type: disc; padding-left: 32px",
        },
        ol: {
          style:
            "list-style-position: inside; list-style-type: decimal;  padding-left: 32px",
        },
      },
      placeholder: placeholder || "Start typing...",
      buttons: [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "|",
        "outdent",
        "indent",
        "align",
        "|",
        "hr",
        "source",
        "|",
        "fullsize",
        "brush",
        "|",
        "table",
        "link",
        "|",
        "undo",
        "redo",
        "uploadImage",
      ],
      removeButtons: ["speechRecognize", "video", "file", "image"],
      uploader: {
        insertImageAsBase64URI: false,
      },
      plugins: ["stylePastedButton", "stylePastedContent"],
    };
  }, [placeholder, joditTheme]);

  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={newContent => onBlur(newContent)}
        className="border-2 min-h-[250px]"
      />
    </>
  );
};

export default Editor2;
