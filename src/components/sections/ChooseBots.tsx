
import { numCircle3 } from "../../assets/home";
import Bots from "../bots/Bots";
import Numbering from "../Numbering/Numbering";
export default function ChooseBots() {
  return (
    <section className="wrapper w-full mx-auto section-5 gap-[40px] md:gap-[80px]">
      <Numbering header="chooseBot" image={numCircle3} index="5" headerClass="text-white font-medium"/>
      <Bots />
    </section>
  );
}
