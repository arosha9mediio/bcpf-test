"use client";

import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

const Switcher = ({ setMode, mode, cursor1, cursor2 }) => {
  const switcherIcon = useRef();
  const switcherItems = useRef();
  const switcherOpen = useRef();
  const switcherClose = useRef();
  const cursorStyle = useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      //@ts-ignore
      switcherIcon.current.style.zIndex = "1000";
      //@ts-ignore
      switcherItems.current.style.zIndex = "1000";
    }
  }, [setMode]);

  const openSwitcher = () => {
    //@ts-ignore
    switcherOpen.current.style.display = "none";
    //@ts-ignore
    switcherClose.current.style.display = "flex";
    //@ts-ignore
    switcherIcon.current.style.right = "280px";
    //@ts-ignore
    switcherItems.current.style.right = "0";
  };
  const closeSwitcher = () => {
    //@ts-ignore
    switcherClose.current.style.display = "none";
    //@ts-ignore
    switcherOpen.current.style.display = "flex";
    //@ts-ignore
    switcherIcon.current.style.right = "0";
    //@ts-ignore
    switcherItems.current.style.right = "-280px";
  };
  const cursor = () => {
    //@ts-ignore
    let cursor_val = cursorStyle.current.value;

    if (cursor_val == "1") {
      cursor1.current.style.display = "none";
      cursor2.current.style.display = "none";
    } else {
      cursor1.current.style.display = "";
      cursor2.current.style.display = "";
    }
  };

  const modeChange = data => {
    if (data == "dark") {
      if (setMode) {
        setMode("dark");
      }
    } else {
      if (setMode) {
        setMode("");
      }
    }
  };
  return (
    <>
      <div className="switcher__area">
        <div className="switcher__icon" ref={switcherIcon}>
          <button id="switcher_open" ref={switcherOpen} onClick={openSwitcher}>
            <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
          </button>
          <button
            id="switcher_close"
            ref={switcherClose}
            onClick={closeSwitcher}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>

        <div className="switcher__items" ref={switcherItems}>
          <div className="switcher__item">
            <div className="switch__title-wrap">
              <h2 className="switcher__title">Cursor</h2>
            </div>
            <div className="switcher__btn">
              <select
                defaultValue={2}
                name="cursor-style"
                id="cursor_style"
                ref={cursorStyle}
                onChange={cursor}>
                <option value="1">default</option>
                <option value="2">animated</option>
              </select>
            </div>
          </div>

          <div className="switcher__item">
            <div className="switch__title-wrap">
              <h2 className="switcher__title">mode</h2>
            </div>
            <div className="switcher__btn mode-type wc-col-2">
              <button
                onClick={() => modeChange("light")}
                className={mode == "dark" ? "" : "active"}>
                light
              </button>
              <button
                onClick={() => modeChange("dark")}
                className={mode == "dark" ? "active" : ""}>
                dark
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Switcher;
