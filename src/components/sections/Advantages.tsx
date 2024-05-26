
import { useTranslation } from "react-i18next";
import Numbering from "../Numbering/Numbering";
import { a1, a2, a3 } from "../../assets/advantages";
import { numCircle2 } from "../../assets/home";
export default function Advantages() {
  const { t } = useTranslation();
  return (
    <section id="advantages" className="relative">
      <Numbering index={"3"} image={numCircle2} header={"homeAdvantages"} headerClass="text-greenSection font-medium"/>
      <div className="section-3 relative overflow-hidden ">
        <div className="section__wrapper text-white ">
          <ul className="grid  md:grid-cols-2 gap-11 md:gap-y-48 place-content-center justify-items-center">
            <li className="h-full" data-aos="fade-right">
              <div className="section-3__card">
                <span> {t("homeAdvantagesDecisionPart1")}</span>{" "}
                {t("homeAdvantagesDecisionPart2")}
                <img src={a3} alt="" />
              </div>
            </li>
            <li className="h-full" data-aos="fade-left">
              <div className="section-3__card">
                <span> {t("homeAdvantagesTimePart1")}</span>{" "}
                {t("homeAdvantagesTimePart2")}
                <img src={a1} alt="" />
              </div>
            </li>
            <li
              className="md:col-span-2 md:w-1/2 h-full"
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
            >
              <div className="section-3__card">
                <span>{t("homeAdvantagesAccessibilityPart1")}</span>{" "}
                {t("homeAdvantagesAccessibilityPart2")}
                <img src={a2} alt="" />
              </div>
            </li>
          </ul>
        </div>



      </div>
    </section>
  );
}
