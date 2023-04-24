import React, { useEffect, useRef, forwardRef } from "react";
import { ReactComponent as BookIcon } from "../icons/Book.svg";
import { ToolbarButton } from "../input/ToolbarButton";
import styles from "./ChatSidebar.scss";
import { FormattedMessage} from "react-intl";

export function TipsToolbarButton(props) {
  return (
    <ToolbarButton
      {...props}
      className={styles.tipsToolbarButton}
      icon={<BookIcon />}
      preset="accent4"
      label={<FormattedMessage id="tips-toolbar-button" defaultMessage="Dicas" />}
    />
  );
}
