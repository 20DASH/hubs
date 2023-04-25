import React, {useState, useEffect} from "react";
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
     <p>
      <span className={styles.titleBox} >Olá!</span>
      Você está prestes a interagir com conteúdos e discussões que falam sobre autoimagem, autoestima e outras questões emocionais relacionadas à vida digital.
      Essa experiência foi feita para reflexão, mas se você sente que esse tipo de conversa não vai te fazer bem nesse momento, respeite esse sentimento!
      Fique à vontade para sair, e considere um dos canais de ajuda gratuitos disponíveis que temos por&nbsp;<Link to={{ pathname: "https://vitaalere.com.br/sobre-o-suicidio/prevencao/onde-procurar-ajuda/" }} target="_blank">aqui</Link>."
     </p>
    </Column>
  );
}
/*

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
*/


SafernetPopoverContent.propTypes = {};


export function SafernetPopoverButton({
  popoverApiRef,
  scene,
  entered,
  ...rest
}) {

  const title = "Canal de Ajuda";
  const [visible, setVisible] = useState();

  const toggleVis = () => {
    setVisible(!visible)
  }
  useEffect(() => {
    scene.addEventListener("action_toggle_help", toggleVis);
    return () => {
      scene.removeEventListener("action_toggle_help", toggleVis);
    }
  }, [scene, visible]);
  useEffect(()=>{
    setVisible(entered)
  },[entered])

  return (
    <Popover
      title={title}
      content={() => (
        <SafernetPopoverContent/>
      )}
      placement="top-end"
      offsetDistance={28}
      initiallyVisible={false}
      popoverApiRef={popoverApiRef}
      isVisible={visible}
      onChangeVisible={() => { scene.emit("action_toggle_help"); localStorage.setItem("__safernet_legal_accepted", true) }}
    >
      {({ togglePopover, popoverVisible, triggerRef }) => (
        <ToolbarButton
          ref={triggerRef}
          icon={<SafernetIcon />}
          selected={popoverVisible}
          onClick={() =>  scene.emit("action_toggle_help")}
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
