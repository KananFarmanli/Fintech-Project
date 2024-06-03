import {
  numCircle,
  bot,
  subscription,
  duration,
  price,
  cryptocurrency,
  transaction,
  activate,
  buykey,
  bot10,
  vector7,
  plan,
} from "../../assets/home";
import { useTranslation, Trans } from "react-i18next";
import Numbering from "../Numbering/Numbering";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Link } from "react-router-dom";

type TranslationKeys = "homeHowItWorksSelectBot" | "homeHowItWorksSubscriptionDuration" | "homeHowItWorksSubscriptionType" | "homeHowItWorksPricing" | "homeHowItWorksConfirmation" | "homeHowItWorksCrypto" | "homeHowItWorksTransaction" | "homeHowItWorksBuy" | "homeHowItWorksActive";

interface TimelineElement {
    key: TranslationKeys;
    icon: string;
}

export default function HowItWorks() {

  const { t } = useTranslation();



  const timelineElements: TimelineElement[] = [
    { key: "homeHowItWorksSelectBot", icon: bot },
    { key: "homeHowItWorksSubscriptionDuration", icon: duration },
    { key: "homeHowItWorksSubscriptionType", icon: subscription },
    { key: "homeHowItWorksPricing", icon: price },
    { key: "homeHowItWorksConfirmation", icon: plan },
    { key: "homeHowItWorksCrypto", icon: cryptocurrency },
    { key: "homeHowItWorksTransaction", icon: transaction },
    { key: "homeHowItWorksBuy", icon: buykey },
    { key: "homeHowItWorksActive", icon: activate },
  ];

  return (
    <section id="how-it-works" className="relative">
      <Numbering
        index={"4"}
        image={numCircle}
        header={"homeHowItWorks"}
        headerClass="text-blueSection font-medium"
      />
      <div className="section-4 ">
        <div className="mx-auto max-w-[1366px] w-full flex">
          <VerticalTimeline
            layout="2-columns"

        
          >
            
            {timelineElements.map((element, index) => (
              <VerticalTimelineElement
                position={`${(index == timelineElements.length - 1) ? "right" : " "}`}
                key={index}
                className=" transition-all duration-1000"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff"}}
                iconClassName={"overflow-hidden rounded-[19%]"}
             
                icon={<img className="absolute top-1/2 left-1/2 max-w-[unset] -translate-x-1/2 -translate-y-1/2 w-[108%]" src={element.icon} alt={t(element.key)} />}
              
        
              >
                <h3 className="vertical-timeline-element-title opacity-75  text-base md:text-lg">{t(`${element.key}`)}</h3>
                <p>
                  {element.key === "homeHowItWorksActive" ? (
                    <Trans i18nKey={`${element.key}Text`}>
                      Enter the received key in the bot after the /start command to activate your subscription. Learn more <Link className="underline" to="/bot-usage" target="_blank" rel="noopener noreferrer">here</Link>.
                    </Trans>
                  ) : (
                    t(`${element.key}Text`)
                  )}
                </p>
              </VerticalTimelineElement>
            ))}
        <div className="w-full  max-w-[400px] hidden md:block  md:max-w-[500px] lg:max-w-[700px] bottom-[-2px] md:bottom-[-242px] rotate-[0deg] absolute z-[-1]   left-[0px]  md:left-[-20px]">
            <img className="w-full h-auto" src={bot10} alt="" />
          </div>
          </VerticalTimeline>
        </div>
        <div className="w-full  max-w-[400px] md:max-w-[550px]  lg:max-w-[700px] bottom-[-2px] md:bottom-[-2px] rotate-[0deg] absolute   left-[0px]  md:left-[0px] z-[-2]">
            <img className="w-full h-auto " src={vector7} alt="" />
          </div>
      </div>
    </section>
  );
}


