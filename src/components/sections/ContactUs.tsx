
import telegram2 from "../../assets/contact us/telegram2.png";
import { useTranslation } from 'react-i18next';
import ContactForm from '../contact-form/ContactForm';
import { numCircle5, vector8, vector9 } from '../../assets/home/'
import Numbering from "../Numbering/Numbering";
import { Link } from "react-router-dom";
export default function ContactUs() {
    const { t } = useTranslation();
  return (
    <section
    id="contact-us"
    className=" gap-24   px-[15px]  sm:px-[20px] lg:px-[35px] relative"
  >
    <div className="section__header">
        <div className="section__title  text-white">
        <Numbering index={"6"} image={numCircle5} header={"contactUsContact"} headerClass="text-redSection font-medium" />
      </div>
    </div>
    <div className="section-6 section__wrapper relative min-h-[650px] ">
      <div className="mx-auto max-w-[1366px] w-full text-white text-2xl flex flex-col gap-10">
        <div className="flex gap-6 text-xl justify-center items-center text-center">
          <div className=" w-[40px] sm:w-[60px] h-auto">
            <img className="w-full h-full" src={telegram2} alt="" />
          </div>
          <div className="flex flex-col items-start justify-center text-left text-sm sm:text-xl">
            <h1>Telegram:</h1>
            <Link to={"https://t.me/ShMurad200"} className=" text-sm sm:text-xl hover:text-black">@Fintech support</Link>
          </div>
        </div>
        <span className="text-[20px]  md:text-[30px] text-white font-semibold text-center ">
          {t("contactUsOr")}
        </span>
        <ContactForm />
      </div>
          <div className="w-full  max-w-[100px]  md:max-w-[136px] bottom-[258px] md:bottom-[198px]  absolute -z-[1]   right-[15px] lg:right-[120px] xl:right-[167px]">
          <img className="w-full h-auto" src={vector9} alt="" />
        </div>
          <div className="w-full  max-w-[120px]  md:max-w-[156px] bottom-[100px] md:bottom-[0px]  absolute -z-[1]   left-[15px] lg:left-[120px] xl:left-[167px]">
          <img className="w-full h-auto" src={vector8} alt="" />
        </div>
          </div>
          
  </section>
  )
}
