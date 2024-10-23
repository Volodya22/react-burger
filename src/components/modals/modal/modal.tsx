import { ReactNode, useEffect } from "react";
import styles from "./modal.module.scss";
import ReactPortal from "../react-portal";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type ReactPortalProps = {
  wrapperId: string,
  title?: string,
  children?: ReactNode,
  isOpen: boolean,
  toggle: () => void
}

export default function Modal(props: ReactPortalProps) {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" && props.isOpen ? props.toggle() : null;
    
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [props.toggle]);

  if (!props.isOpen) return null;

  return (
    <ReactPortal wrapperId={props.wrapperId}>
      <ModalOverlay onClick={props.toggle}>
        <div className={styles.modalContent}>
          <div className={styles.side}>
            <CloseIcon type="primary" onClick={props.toggle} />
          </div>
          <div className={styles.content}>
            {props.children}
          </div>
        </div>
      </ModalOverlay>
    </ReactPortal>
  );
};
