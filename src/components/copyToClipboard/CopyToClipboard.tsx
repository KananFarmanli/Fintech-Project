import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCopySharp } from "react-icons/io5";
import { MdDoneOutline } from "react-icons/md";
import { getToken } from "../../utils/choosePlan";



const CopyToClipboard = () => {
  const [text] = useState("0x091bA16086AF6F90d1a4360DaAE032527A2D2792");
  const [textToken, setTextToken] = useState<string | false>(
    getToken() || false
  );
  const [isCopied, setIsCopied] = useState({
    value: true,
    text: "",
  });
  const { t } = useTranslation();
  const copyToClipboard = (text: string, value: "token" | "transaction") => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied({
          value: true,
          text: value,
        });
        setTimeout(() => {
          setIsCopied({
            value: false,
            text: "",
          });
        }, 2000);
      })
      .catch(() => {
        alert("Failed to copy text");
      });
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = getToken();
      if (!token) {
        setTextToken(false); 
      }
    }, 6000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-start w-full xs:w-[350px]">
      {textToken ? (
        <div className="flex flex-col gap-1 text-sm">
          <p>{t("token")}:</p>
          <div className="rounded-lg border-[1px] border-blueSection p-1 bg-[#0040e93d] flex items-center justify-center gap-1  text-[12px]">
            <p>{textToken}</p>
            <button
              className="h-full text-base"
              onClick={() => copyToClipboard(textToken, "token")}
            >
              {isCopied.value && isCopied.text == "token" ? (
                <MdDoneOutline />
              ) : (
                <IoCopySharp />
              )}
            </button>
          </div>
        </div>
      ) : 
        <div className="flex flex-col gap-1 text-sm">
          <p>{t("token")}:</p>
          <div className="rounded-lg border-[1px] border-redSection p-1 px-[10px] bg-[#dc2626a1] flex items-center justify-center gap-1  text-[12px]">
            <p>{t("confirmationTransactionTokenNotGenerated") }</p>
    </div>
        </div>
      
      }
      <div className="flex flex-col gap-1 text-sm">
        <p>{t("walletAddress")}:</p>
        <div className="rounded-lg border-[1px] border-blueSection p-1 px-[10px] bg-[#0040e93d] flex items-center justify-center gap-1 text-[11px] xs:text-[12px]">
          <p>{text}</p>
          <button
            className="h-full text-base"
            onClick={() => copyToClipboard(text, "transaction")}
          >
            {isCopied.value && isCopied.text == "transaction" ? (
              <MdDoneOutline />
            ) : (
              <IoCopySharp />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p>{t("network")}: </p>{" "}
        <p className="rounded-lg border-[1px] border-blueSection p-1  px-[10px] bg-[#0040e93d] flex items-center justify-center gap-1  text-[12px]">
          BNB Smart Chain
        </p>
      </div>
    </div>
  );
};

export default CopyToClipboard;
