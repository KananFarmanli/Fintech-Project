import { useTranslation } from "react-i18next";
import { numCircle1, vector, bot11 } from "../../assets/home";
import Numbering from "../Numbering/Numbering";

export default function AboutCompany() {
  const { t } = useTranslation();
  return (
    <section id="about-company">
      <Numbering
        index={"2"}
        image={numCircle1}
        header={"homeAboutCompany"}
        headerClass="text-violetSection font-medium"
      />

      <div className="section-2 relative ">
        <div className="px-6 mx-auto max-w-[1366px] w-full h-full flex items-center relative z-[1] justify-start ">
          <div
            className="  text-white sm:text-base md:text-lg font-medium  w-full  lg:w-[50%] md:w-[70%] "
            data-aos="fade-right"
          >
            {t("homeAboutCompanyPart1")}{" "}
            <span> {t("homeAboutCompanyPart2")}</span>
            {t("homeAboutCompanyPart3")}.
          </div>
          <div className="w-full  max-w-[400px] hidden md:block  md:max-w-[500px] lg:max-w-[700px] bottom-[-200px] md:bottom-[-280px] rotate-[0deg] absolute z-[-1]   right-[0px]  md:right-[-100px]">
            <img className="w-full h-auto" src={bot11} alt="" />
          </div>
        </div>
        <div className="w-full  max-w-[400px]  md:max-w-[650px] lg:max-w-[800px] bottom-[-58px] md:bottom-[-100px] rotate-[4deg] absolute -z-[1]   right-[-36px]  md:right-[-60px]">
          <img className="w-full h-auto" src={vector} alt="" />
        </div>
      </div>
    </section>
  );
}
