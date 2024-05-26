import { useTranslation } from "react-i18next";
import Resources from "../../@types/resources";

type NumberingType = {
  header: keyof Resources["translation"];
  index: string;
  image: string;
  headerClass?: string;
};

export default function Numbering({
  header,
  index,
  image,
  headerClass,
}: NumberingType) {
  const { t } = useTranslation();
  return (
    <div className="section__header">
      <div className="numbering ">
        <div className="index ">{index}</div>
        <div className="circle ">
          <img src={image} alt="" />
        </div>
      </div>

      <div className={`section__title ${headerClass} `}>
        <div>{t(header)}</div>
      </div>
    </div>
  );
}
