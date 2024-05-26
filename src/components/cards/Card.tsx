import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
type CardPropsType = {
  content: string;
  title: string;
  id: number;
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
  img,
}: CardPropsType) {
  const { t } = useTranslation();
  const handleClick = (id: number) => {
    setActiveCardId(id);
  };
  const navigate = useNavigate()
  function selectHandler() {
    navigate(`plan/${id}`)
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
          className={`details h-[300px] flex flex-col justify-between text-white   ${
            isActive && " details-active"
          }`}
        >
          <h1 className="">{title} </h1>
          <p className="info">{content}</p>
          <button
            onClick={selectHandler}
            disabled={!isAvailable}
            className={`bg-red-500 hover:bg-blueSection transition block w-full text-center rounded p-1 mt-1 ${
              isAvailable || "hover:bg-slate-500 select-none !bg-slate-500 "
            } `}
          >
            {!isAvailable ? t("botNotAvailableBtn") : t("botAvailableBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}