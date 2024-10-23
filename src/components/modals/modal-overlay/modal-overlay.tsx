import styles from './modal-overlay.module.scss'

export const ModalOverlay = (props: any) => {
  return (
    <div className={styles.overlay} onClick={props.onClick}>{props.children}</div>
  );
}
