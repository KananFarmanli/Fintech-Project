import { motion } from "framer-motion";
import {
  firstStep,
  forthStep,
  secondStep,
  thirdStep,
} from "../assets/bot-usage";
import Line from "../components/line/Line";

export default function BotUsage() {
  return (
    
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
      <Line />

      <div
        className="section__wrapper my-[200px] !h-[unset] gap-24
    !flex-col "
      >
        <h1 className=" text-3xl text-white">
          How to <span className="text-violetSection">start</span> to use{" "}
          <span className="text-blueSection">bot</span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-11">
          <div className="w-[300px] order-1 sm:order-[unset] border-2 border-white rounded-lg overflow-hidden">
            <img className="h-auto w-full" src={firstStep} alt="" />
          </div>
          <div className="flex flex-col gap-5 justify-center items-center text-white w-full md:w-1/3">
            <h1>How to start</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis quibusdam ipsa enim pariatur cumque labore eligendi sed
              maxime impedit possimus.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-11">
          <div className="w-[300px] order-1 border-2 border-white rounded-lg overflow-hidden">
            <img className="h-auto w-full" src={secondStep} alt="" />
          </div>
          <div className="flex flex-col gap-5 justify-center items-center text-white w-full md:w-1/3">
            <h1>How to start</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis quibusdam ipsa enim pariatur cumque labore eligendi sed
              maxime impedit possimus.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-11">
          <div className="w-[300px] order-1 sm:order-[unset] border-2 border-white rounded-lg overflow-hidden">
            <img className="h-auto w-full" src={thirdStep} alt="" />
          </div>
          <div className="flex flex-col gap-5 justify-center items-center text-white w-full md:w-1/3">
            <h1>How to start</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis quibusdam ipsa enim pariatur cumque labore eligendi sed
              maxime impedit possimus.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-11">
          <div className="w-[300px] order-1 border-2 border-white rounded-lg overflow-hidden">
            <img className="h-auto w-full" src={forthStep} alt="" />
          </div>
          <div className="flex flex-col gap-5 justify-center items-center text-white w-full md:w-1/3">
            <h1>How to start</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis quibusdam ipsa enim pariatur cumque labore eligendi sed
              maxime impedit possimus.
            </p>
          </div>
        </div>
      </div>
      </motion.div>
  );
}
