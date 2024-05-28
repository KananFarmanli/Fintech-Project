import { useState } from "react";
import * as images from "../../assets/bots/index.ts";
import Card from "../cards/Card.tsx";
import { useGetAllBotsQuery } from "../../api/apiSlice.ts";
import CardsPending from "../cards/CardsPending.tsx";
import { PatchedError, PatchedErrorType } from "../../pages/ErrorBoundary.tsx";
import { useTranslation } from "react-i18next";
import { useStateProvider } from "../../context/StateProvider.tsx";
const IMAGES = Object.values(images);

export default function Bots() {
  const [activeCardIds, setActiveCardIds] = useState<number[]>([]);
  const { data, isLoading, isError, error } = useGetAllBotsQuery();
  const { t } = useTranslation();
  const {models:{lang}} = useStateProvider()
  if (isError) {
    const status = (error as PatchedErrorType).status;
    throw new PatchedError(t("errorBots"), status);
  }
console.log(data)

  const handleSetActiveCardId = (id: number) => {
    setActiveCardIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  return (
    <div className=" py-12 h-min grid-cols-repeat-1 md:grid-rows-[unset] w-full mx-auto grid gap-y-11 md:grid-cols-repeat-2 xl:grid-cols-repeat-3 gap-4 justify-evenly content-start">
      {isLoading
        ? IMAGES.slice(0, 9).map((img, index) => (
            <CardsPending key={index} img={img} />
          ))
        : data?.map((el, i) => {
            const Logo = IMAGES[i];
            const name = el.nameForWeb.replace(/_/g, " ");
            let lastItem = "";
            if (data.length - 1 === i) {
              lastItem =
                " md:col-span-2 md:place-self-center md:max-w-[250px] xl:col-span-1 ";
            }
            return (
              <Card
                isAvailable={el.isAvailable=="true"}
                key={el.id}
                content={el.description[lang]}
                title={name}
                id={el.id}
                isActive={activeCardIds.includes(el.id)}
                setActiveCardId={handleSetActiveCardId}
                primaryClass={lastItem}
                img={Logo}
              />
            );
          })}
    </div>
  );
}
