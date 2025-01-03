import { ModalOverlayProps } from '../../../models';
import styles from './modal-overlay.module.scss'

export const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <div className={styles.overlay} onClick={props.onClick} data-cy='overlay'>{props.children}</div>
  );
};
