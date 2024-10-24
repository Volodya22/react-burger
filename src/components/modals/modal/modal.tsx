import { ReactNode, useEffect } from "react";
import styles from "./modal.module.scss";
import ReactPortal from "../react-portal";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalProps } from "../../../models";

export default function Modal(props: ModalProps) {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? props.toggle() : null;
    
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [props.toggle]);

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
