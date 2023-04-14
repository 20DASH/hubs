import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NoObjects, ObjectsSidebar, ObjectsSidebarItem } from "./TipsSidebar";
import { List } from "../layout/List";
import { Divider } from "../layout/Divider";
import { useObjectList } from "./useObjectList";
import { Sidebar } from "../sidebar/Sidebar";
import { FormattedMessage } from "react-intl";
import { CloseButton } from "../input/CloseButton";
import styles from "../layout/List.scss";
import { ReactComponent as TipsIcon } from "../icons/Book.svg";

export function TipsSidebarContainer({ onClose, hubChannel }) {
  const listRef = useRef();
  const tips = [1,2,3,4];
  const { selectedObject, selectObject, unfocusObject, focusObject } = useObjectList();
  const [show, setShow] = useState(1);

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
        id="tips-sidebar.title"
        defaultMessage="Dicas Safernet"
        values=""
      />
    }
    beforeTitle={<CloseButton onClick={onClose} />}
  >
    <ul>
      {tips.map(tip=><li className={classNames(styles.listItem)}>
        <button className={classNames(styles.listItemContent, styles.buttonListItem, styles.tipsButtom)}
           onClick={()=>setShow(tip)}>
          <span><TipsIcon /> DICA {tip}</span>
          {show==tip && <div className={styles.tipContent}>
            <Divider margin="md"/>
            content
          </div>}
        </button>
      </li>)}
    </ul>
  </Sidebar>
  );

  return (
    <ObjectsSidebar objectCount={tips.length} onClose={onClose}>
      {tips.length > 0 ? (
        <List ref={listRef}>
          {tips.map(object => (
            <ObjectsSidebarItem
              selected={selectedObject === object}
              object={object}
              key={object.id}
              onClick={() => selectObject(object)}
              onMouseOver={() => focusObject(object)}
              onFocus={() => focusObject(object)}
              onMouseOut={onUnfocusListItem}
              onBlur={onUnfocusListItem}
            />
          ))}
        </List>
      ) : (
        <NoObjects canAddObjects={hubChannel.can("spawn_and_move_media")} />
      )}
    </ObjectsSidebar>
  );
}

TipsSidebarContainer.propTypes = {
  hubChannel: PropTypes.object.isRequired,
  onClose: PropTypes.func
};
