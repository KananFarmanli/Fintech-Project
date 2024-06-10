
import { Dispatch,useContext, useState, createContext, ReactNode, SetStateAction, useEffect } from "react";
import i18n from "../i18n";

export enum Lang {
  en = "en",
  ru = "ru",
  tr = "tr"
}

type AppState = {
  lang: keyof typeof Lang;
  notification: NotificationType;
};

export type NotificationType = {
  visible: boolean;
  message: string
  error: boolean;
  success: boolean;
  manuallyClose:boolean
};

type Operations = {
  changeLanguage: (lang: keyof typeof Lang) => void;
  setNotification: Dispatch<SetStateAction<NotificationType>>;
};

type GlobalState = {
  operations: Operations;
  models: AppState;
};

const INIT_STATE: AppState = {
  lang: Lang.en,
  notification: {
    visible: false,
    message: "Notification",
    error: false,
    success: false,
    manuallyClose:false
  },
};

const defaultGlobalState: GlobalState = {
  operations: {
    changeLanguage: () => {},
    setNotification: () => {},
  },
  models: INIT_STATE,
};

const StateContext = createContext<GlobalState>(defaultGlobalState);

type StateProviderProps = {
  children: ReactNode;
};

export default function StateProvider({ children }: StateProviderProps) {
  const [notification, setNotification] = useState({
    visible:false,
    message:"Notification",
    error:false,
    success: false,
    manuallyClose:false

  });
  const [lang, setLang] = useState<keyof typeof Lang>(Lang.en);


  function changeLanguage(lang: keyof typeof Lang) {
    setLang(lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang)

  }

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as keyof typeof Lang;
    if (storedLang && storedLang !== lang) {
      setLang(storedLang);
    }
    i18n.changeLanguage(lang);
  }, [lang]);


  const globalState: GlobalState = {
    operations: {
      changeLanguage,
      setNotification,
    },
    models: { lang, notification },
  };

  return (
    <StateContext.Provider value={globalState}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateProvider = () => useContext(StateContext);


