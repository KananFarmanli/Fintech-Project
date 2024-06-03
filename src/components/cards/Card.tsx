import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
type CardPropsType = {
  content: string;
  title: string;
  id: number;
  url: string | undefined;
  isActive: boolean;
  primaryClass?: string;
  img: string;
  isAvailable?: boolean;
  setActiveCardId: (id: number) => void;
};
export default function Card({
  content,
  title,
  id,
  isActive,
  primaryClass,
  setActiveCardId,
  isAvailable,
  url = "",
  img,
}: CardPropsType) {
  const { t } = useTranslation();
  const handleClick = (id: number) => {
    setActiveCardId(id);
  };
  const navigate = useNavigate();
  function selectHandler() {
    navigate(`plan/${id}`);
  }

  return (
    <div
      id={`${id}`}
      onClick={() => handleClick(id)}
      className={`card card-color   ${primaryClass} ${
        isActive && "card-active  "
      }`}
    >
      <div className={`card__wrapper relative  ${isActive && " bottom-0 "}`}>
        <div>
          <h1 className={`opacity-0 title ${isActive && "title-active"}`}>
            {title}{" "}
          </h1>
          <div className={`bot-logo ${isActive && " bot-logo-active"} `}>
            <img src={img} alt="" />
          </div>
        </div>
        <div
          className={`details h-full md:h-[270px] xl:h-[300px] flex flex-col justify-between  text-white   ${
            isActive && " details-active"
          }`}
        >
          <h1 className="">{title} </h1>
          <p className="info">{content}</p>
          <div className="flex items-center justify-center gap-3 text-[12px]  md:text-[10px] xl:text-[12px]">
            <button
              onClick={selectHandler}
              disabled={!isAvailable}
              className={`bg-red-500 hover:bg-blueSection transition block w-full text-center rounded p-1 mt-1 ${
                isAvailable || "hover:bg-slate-500 select-none !bg-slate-500 "
              } `}
            >
              {!isAvailable ? t("botNotAvailableBtn") : t("botAvailableBtn")}
            </button>
            <button
              disabled={!isAvailable}
              className={`bg-red-500 hover:bg-blueSection transition block w-full text-center rounded  mt-1 ${
                isAvailable || "hover:bg-slate-500 select-none !bg-slate-500 "
              } `}
            >
              <Link
                to={url}
                className={`inline-block p-1 w-full h-full ${
                  isAvailable ? "" : "pointer-events-none cursor-default"
                }`}
              >
                {t("link")}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
