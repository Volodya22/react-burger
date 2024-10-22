import { ReactNode, useEffect } from "react";
import styles from "./modal.module.scss";
import ReactPortal from "../react-portal";

type ReactPortalProps = {
  wrapperId: string,
  title?: string,
  children?: ReactNode,
  isOpen: boolean,
  toggle: () => void
}

export default function Modal(props: ReactPortalProps) {
  useEffect(() => {
    const closeOnEscapeKey = (e: any) => e.key === "Escape" ? props.toggle() : null;

    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [props.toggle]);

  if (!props.isOpen) return null;

  return (
    <ReactPortal wrapperId={props.wrapperId}>
      <div className={styles.modal}>
        <button onClick={props.toggle} className="close-btn">
          Close
        </button>
        <div className={styles.modalContent}>{props.children}</div>
      </div>
    </ReactPortal>
  );
};
