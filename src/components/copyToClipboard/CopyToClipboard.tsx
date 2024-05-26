import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCopySharp } from "react-icons/io5";
import { MdDoneOutline } from "react-icons/md";

const CopyToClipboard = () => {
  const [text] = useState("0x091bA16086AF6F90d1a4360DaAE032527A2D2792");
  const [textToken] = useState<string | false>(
    localStorage.getItem("token") || false
  );
  const [isCopied, setIsCopied] = useState({
    value: true,
    text:""
  });
  const { t } = useTranslation();
  const copyToClipboard = (text: string, value: "token"|"transaction" ) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied({
          value: true,
          text:value
        });
        setTimeout(() => {
          setIsCopied({
            value: false,
            text:""
          });
        }, 2000);
      })
      .catch(() => {
        alert("Failed to copy text");
      });
  };

  return (
    <div className="flex flex-col gap-2 justify-start w-[350px]">
      {textToken && (
        <div className="flex flex-col gap-1 text-sm">
          <p>{t("token")}:</p>
          <div className="rounded-lg border-[1px] border-blueSection p-1 bg-[#0040e93d] flex items-center justify-center gap-1  text-[12px]">
            <p>{textToken}</p>
            <button
              className="h-full text-base"
              onClick={() => copyToClipboard(textToken, "token")}
            >
              {isCopied.value && isCopied.text=="token" ? <MdDoneOutline /> : <IoCopySharp />}
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 text-sm">
        <p>{t("walletAddress")}:</p>
        <div className="rounded-lg border-[1px] border-blueSection p-1 bg-[#0040e93d] flex items-center justify-center gap-1  text-[12px]">
          <p>{text}</p>
          <button className="h-full text-base"  onClick={() => copyToClipboard(text, "transaction")}>
            {isCopied.value && isCopied.text=="transaction"? <MdDoneOutline /> : <IoCopySharp />}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p>{t("network")}: </p>{" "}
        <p className="rounded-lg border-[1px] border-blueSection p-1 bg-[#0040e93d] flex items-center justify-center gap-1  text-[12px]">
          BNB Smart Chain
        </p>
      </div>
    </div>
  );
};

export default CopyToClipboard;
