import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Divider } from "../layout/Divider";
import { useObjectList } from "./useObjectList";
import { Sidebar } from "../sidebar/Sidebar";
import { FormattedMessage } from "react-intl";
import { CloseButton } from "../input/CloseButton";
import styles from "../layout/List.scss";
import { ReactComponent as TipsIcon } from "../icons/Book.svg";

export function TipsSidebarContainer({ onClose }) {
  const listRef = useRef();
  const tips = ["Está vendo como a Thay pode ser parecida com a gente com seus medos e desconfortos? Quantos posts vocês já deixaram de postar? A opinião do outro pode ser importante, mas não deve ser mais do que a sua. Não deixe que ninguém dite como deve ser ou que qualquer crítica de uma parte, roupa ou jeito seu te impeça de ser quem você é. Somos muito mais do que postamos. Acredite!", "O que ficou de mais importante para você do que a Hannah contou? Como ela te inspira e o que acha que pode fazer de diferente e de uma maneira positiva? Todos temos nossos altos e baixos nas emoções e como reagimos às críticas, isso é normal. Saber o que te incomoda faz parte do autoconhecimento, assim como quais são suas qualidades e quais são os sinais que precisa de um tempo. E se te abalar, autocuidado e limites! E se tiver muito difícil, peça ajuda! Conheça os canais!", "Conhece alguém que como o João já ocultou posts de momentos super legais por medo de julgamento? Ou que estava com a autoestima abalada e por isso ficou supercrítico com si mesmo? E você, já fez isso? #quemnunca – mas atenção – dicas rápidas aqui: concentre-se nos seus objetivos, lembre-se do que foi fazer ou buscar na internet, comparação é diferente de inspiração e a sua saúde mental é mais importante que qualquer conteúdo. Bora construir juntos uma internet mais saudável para todo mundo?"];
  const { selectedObject, selectObject, unfocusObject, focusObject } = useObjectList();
  const [show, setShow] = useState(0);

  const onUnfocusListItem = useCallback(
    e => {
      if (e.relatedTarget === listRef.current || !listRef.current.contains(e.relatedTarget)) {
        unfocusObject();
      }
    },
    [unfocusObject, listRef]
  );

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
  >
    <ul>
      {tips.map((tip, index)=><li className={classNames(styles.listItem)} key={index.toString()}>
        <button className={classNames(styles.listItemContent, styles.buttonListItem, styles.tipsButtom)}
           onClick={()=>setShow(index)}>
          <span><TipsIcon /> DICA {index + 1}</span>
          {show==index && <div className={styles.tipContent}>
            <Divider margin="md"/>
            <p>{tip}</p>
          </div>}
        </button>
      </li>)}
    </ul>
  </Sidebar>
  );

}

TipsSidebarContainer.propTypes = {
  onClose: PropTypes.func
};
