import React, { useEffect, useRef } from "react";
import { SafernetPopoverButton } from "./SafernetPopover";
import { handleExitTo2DInterstitial } from "../../utils/vr-interstitial";
import PropTypes from "prop-types";

export function SafernetPopoverContainer({scene}) {

  const popoverApiRef = useRef();

  // Handle clicking on the invite button while in VR.
  useEffect(
    () => {
      function onInviteButtonClicked() {
        handleExitTo2DInterstitial(true, () => {}).then(() => {
          popoverApiRef.current.openPopover();
        });
      }

      scene.addEventListener("action_safernet_help", onInviteButtonClicked);

      return () => {
        scene.removeEventListener("action_safernet_help", onInviteButtonClicked);
      };
    },
    [scene, popoverApiRef]
  );


  return (
    <SafernetPopoverButton
      popoverApiRef={popoverApiRef}
    />
  );
}

SafernetPopoverContainer.propTypes = {
    scene: PropTypes.object.isRequired,
};
