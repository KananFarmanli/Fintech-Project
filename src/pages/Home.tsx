import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  AboutCompany,
  Advantages,
  HowItWorks,
  ContactUs,
  ChooseBots,
  Description,
} from "../components/sections";
import useScrollToHash from "../hooks/useScrollToHash";


export default function Home() {
  useScrollToHash()
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col  justify-center items-center w-full py-20"
    >
      <Description />

      <AboutCompany />
      <Advantages />
      <HowItWorks />
      <ChooseBots />
      <ContactUs />
    </motion.div>
  );
}
