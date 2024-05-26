import { useState } from "react";
import { Lang, useStateProvider } from "../../context/StateProvider";


export default function LanguageDropdown() {

  const [showOptions, setShowOptions] = useState(false);
const {operations :{changeLanguage}, models:{lang}} = useStateProvider()
  const handleLanguageChange = (lang :keyof typeof Lang) => {

      changeLanguage(lang)
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const options = [
    { value: Lang.en, label: "En" },
    { value: Lang.ru, label: "Ru" },
    { value: Lang.tr, label: "Tr" },
  ].filter(option => option.value !== lang);


  return (
    <div className="p-1 dropdown text-[10px] cursor-pointer " onClick={toggleOptions}>
       <div className={`link transition-all text-[10px] md:text-xs w-full h-full ${!showOptions||"mb-2"}`} >
        {lang === "en" ? "En" : lang === "ru" ? "Ru" : "Tr"}
      </div>
      {showOptions && (
        <ul className="flex gap-2 flex-col items-center justify-center">
          {options.map(option => (
            <li key={option.value} className="link text-[10px] md:text-xs cursor-pointer " onClick={() => handleLanguageChange(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}