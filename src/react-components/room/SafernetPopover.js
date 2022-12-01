import React from "react";
import PropTypes from "prop-types";
import styles from "./SafernetPopover.scss";
import { Popover } from "../popover/Popover";
import { ToolbarButton } from "../input/ToolbarButton";
import { ReactComponent as SafernetIcon } from "../icons/Safernet.svg";
import { Column } from "../layout/Column";
import {Link} from "react-router-dom";


function SafernetPopoverContent() {
  return (
    <Column center padding grow gap="md" className={styles.safernetPopover}>
      <p>Se você está vivendo alguma situação de violência na Internet, busque&nbsp;
        <Link to={{ pathname: "https://canaldeajuda.org.br" }} target="_blank">https://canaldeajuda.org.br</Link>
          &nbsp; e a equipe da SaferNet poderá ajudar.</p>
      <p>Se você sente que precisa de ajuda profissional para sua saúde mental, busque serviços em&nbsp;
        <Link to={{ pathname: "https://mapasaudemental.com.br" }} target="_blank">https://mapasaudemental.com.br</Link>.</p>
    </Column>
  );
}


SafernetPopoverContent.propTypes = {};


export function SafernetPopoverButton({
  popoverApiRef,
  ...rest
}) {

  const title = "Canal de Ajuda";

  return (
    <Popover
      title={title}
      content={() => (
        <SafernetPopoverContent/>
      )}
      placement="top-start"
      offsetDistance={28}
      initiallyVisible={false}
      popoverApiRef={popoverApiRef}
    >
      {({ togglePopover, popoverVisible, triggerRef }) => (
        <ToolbarButton
          ref={triggerRef}
          icon={<SafernetIcon />}
          selected={popoverVisible}
          onClick={togglePopover}
          label={title}
          {...rest}
        />
      )}
    </Popover>
  );
}

SafernetPopoverButton.propTypes = {
  initiallyVisible: PropTypes.bool,
  popoverApiRef: PropTypes.object,
  ...SafernetPopoverContent.propTypes
};
