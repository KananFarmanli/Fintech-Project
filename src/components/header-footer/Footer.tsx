import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer absolute bottom-0 flex items-end glass w-full h-[5.7rem]  rounded-tl-[30%] rounded-tr-[30%]  z-[2]">
      <div className="flex justify-center items-center  text-white glass w-full h-20   rounded-tl-[33%] rounded-tr-[33%] ">
        <div className="footer__wrapper flex flex-col justify-center items-center gap-3 text-[12px] md:text-sm">
          <h1 className="relative text-[#acd6ff] outline-none tracking-wide leading-3  reflect">
            &copy; 2024 Fintech.
          </h1>
          <h1 className="relative text-[#acd6ff] outline-none tracking-wide leading-3 reflect">
            {t("rights")}
          </h1>
        </div>
      </div>
    </div>
  );
}
