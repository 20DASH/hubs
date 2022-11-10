import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as DownloadIcon } from "./icons/Download.svg";
import { ReactComponent as FacebookIcon } from "./icons/Facebook.svg";
import { ReactComponent as TwitterIcon } from "./icons/Twitter.svg";
import { ReactComponent as CloseButton } from "./icons/CloseBut.svg";
import styles from "./styles/photo-preview.scss";
import configs from "../utils/configs";
import classNames from "classnames";
import Twitter from "./icons/Twitter.svg";
import Facebook from "./icons/Facebook.svg";
import Download from "./icons/Download.svg";
import CloseBut from "./icons/CloseBut.svg";

import { proxiedUrlFor } from "../utils/media-url-utils";
import { share } from "../utils/share";
import { getLandingPageForPhoto } from "../utils/phoenix-utils";
import { FormattedMessage, useIntl } from "react-intl";

export default function PhotoMessage({ name, body: { src: url }, className, maySpawn, hubId }) {
  console.log(name, url, styles);
  let displayName = JSON.parse(window.localStorage.___hubs_store).profile.displayName;
  if (name !== displayName) {
    return (
      <div></div>
    )
  }
  const intl = useIntl();

  const landingPageUrl = getLandingPageForPhoto(url);

  const onShareTwitClicked = () => {
    //console.log('share twitter');
    const link = `https://twitter.com/intent/tweet?text=${landingPageUrl}`;
    window.open(link);
  }

  const onShareFaceClicked = () => {
    //console.log('share face');
    const link = `https://www.facebook.com/sharer/sharer.php?u=${landingPageUrl}`;
    window.open(link);
  }

  const onDownloadClicked = () => {
    //console.log('download', url, landingPageUrl);
    let file = window.APP['latest_media_file'];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (el) => {
      const downLink = document.createElement("a");
      downLink.download = "snapshot.png"
      downLink.href = el.target.result;
      document.body.appendChild(downLink)
      downLink.click()
      document.body.removeChild(downLink)
    })
  }

  const onCloseClicked = () => {
    console.log('close display');
    let el = document.getElementsByClassName('previewPop')[0]
    el.parentNode.removeChild(el);
  }
  // const onShareClicked = share.bind(null, {
  //   url: landingPageUrl,
  //   title: intl.formatMessage(
  //     {
  //       id: "photo-message.default-tweet",
  //       defaultMessage: "Taken in {shareHashtag}"
  //     },
  //     {
  //       shareHashtag: configs.translation("share-hashtag"),
  //       url: `https://${configs.SHORTLINK_DOMAIN}/${hubId}`
  //     }
  //   )
  // });

  return (
    <div className="previewPop">
      <div className="previewCont">
        <a className="previewImageCont" href={landingPageUrl} target="_blank" rel="noopener noreferrer">
          <img className="previewImage" src={url} />
        </a>
        <div className="actionButtonsCont">
          <button className="photoActionButTwit" onClick={onShareTwitClicked}>
            <TwitterIcon className="buttonIcon"/>
          </button>
          <button className="photoActionButFace" onClick={onShareFaceClicked}>
            <FacebookIcon className="buttonIcon"/>
          </button>
          <button className="photoActionButDown" onClick={onDownloadClicked}>
            <DownloadIcon className="buttonIcon"/>
          </button>
          <button className="photoActionButClose" onClick={onCloseClicked}>
            <CloseButton className="buttonIcon"/>
          </button>
        </div>
      </div>
    </div>
  );
}
PhotoMessage.propTypes = {
  name: PropTypes.string,
  maySpawn: PropTypes.bool,
  body: PropTypes.object,
  className: PropTypes.string,
  hubId: PropTypes.string
};
