
import { brain3, numCircle } from "../../assets/home";
import { useTranslation } from "react-i18next";
import useResizeObserver from "../../hooks/useResizeObserver";
import Canvas from "../canvas/Canvas";
import Numbering from "../Numbering/Numbering";
export default function Description() {
  const { t } = useTranslation();
  const { ref: parentRef, size } = useResizeObserver();
 
  return (
    <section
      ref={parentRef}
      id="description"
      className="overflow-hidden pt-[300px] relative flex flex-col items-center"
    >
      <Canvas height={size.height} width={size.width} />
      <Numbering index={"1"} image={numCircle} header={"homeDescription"} headerClass="text-blueSection font-medium"/>
      <div className="section-1 relative ">
        <div className="section__wrapper gap-8">
          <div
            className="hidden md:flex  w-1/2  items-center justify-right"
            data-aos="fade-right"
          >
            <img className="w-[500px] h-auto" src={brain3} alt="" />
          </div>

          <div
            className="w-full md:w-1/2 text-white sm:text-base md:text-lg  font-medium "
            data-aos="fade-left"
          >
            {t("homeDescriptionPart1")}
            <span> {t("homeDescriptionPart2")}</span>{" "}
            {t("homeDescriptionPart3")}
            <span> {t("homeDescriptionPart4")}</span>.
          </div>
        </div>
      </div>
    </section>
  );
}
