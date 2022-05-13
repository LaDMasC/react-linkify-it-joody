import React from "react";
import type { LinkProps } from "types";

export const urlRegex =
  /(https?:\/\/|www\.)([-\w.]+\/[\p{L}\p{Emoji}\p{Emoji_Component}!#$%&'"()*+,./\\:;=_?@[\]~-]*[^\s'",.;:\b)\]}?]|(([\w-]+\.)+[\w-]+[\w/-]))/u;

export const UrlComponent: React.FC<LinkProps> = ({
  match: url,
  className,
}) => {
  const sendMessageToWebview = (url) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "URL_OPEN",
          url,
        })
      );
    }
  };
  return (
    <a
      className={className}
      // href={/^www\./.exec(url) ? `http://${url}` : url}
      // onClick={}
      onClick={() =>
        sendMessageToWebview(/^www\./.exec(url) ? `http://${url}` : url)
      }
      target="_blank"
      rel="noreferrer"
    >
      {url}
    </a>
  );
};
