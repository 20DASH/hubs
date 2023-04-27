import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Sidebar } from "../sidebar/Sidebar";
import { FormattedMessage } from "react-intl";
import { CloseButton } from "../input/CloseButton";
import styles from "../layout/List.scss";
import { Button } from "../input/Button";

export function LegalSidebarContainer({ onClose}) {
  return (
    <Sidebar
    title={
      <FormattedMessage
        id="content-menu.tips-menu-button"
        defaultMessage="Dicas Safernet"
        values=""
      />
    }
    beforeTitle={<CloseButton onClick={onClose} />}
    height="100%"
  >
    <div className={styles.legalContent}>
    <p>
      <h1>Olá!</h1>
      Você está prestes a interagir com conteúdos e discussões que falam sobre autoimagem, autoestima e outras questões emocionais relacionadas à vida digital.
    Essa experiência foi feita para reflexão, mas se você sente que esse tipo de conversa não vai te fazer bem nesse momento, respeite esse sentimento!
    Fique à vontade para sair, e considere um dos canais de ajuda gratuitos disponíveis que temos por <a href="https://vitaalere.com.br/sobre-o-suicidio/prevencao/onde-procurar-ajuda/" target="_blank">aqui</a>."
    </p>
    <br />
    <br />
    <Button preset="accent4" onClick={onClose}>
      <span>
        <FormattedMessage id="legal-sidebar.dismiss-button" defaultMessage="fechar" />
      </span>
    </Button>
    </div>
  </Sidebar>
  );
}

LegalSidebarContainer.propTypes = {
  hubChannel: PropTypes.object.isRequired,
  onClose: PropTypes.func
};
