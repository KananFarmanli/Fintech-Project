import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useStateProvider } from "../context/StateProvider";
import { useTranslation } from "react-i18next";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export default function useContactForm() {
  const {
    operations: { setNotification },
  } = useStateProvider();
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const onSubmit = () => {
    setLoading(true);

    const isValid = Object.keys(errors).length === 0;
    if (!isValid) return;
    if (!formRef.current) return;
    emailjs
      .sendForm(
        "service_lkyvvz6",
        "template_dvyrqk9",
        formRef?.current,
        "n_9af9inXr012M-ob"
      )
      .then(
        () => {
          setValue("name", "");
          setValue("email", "");
          setValue("message", "");
          setNotification((prev) => ({
            ...prev,
            error: false,
            message: t("contactFormNotificationSuccessful"),
            success: true,
            visible: true,
          }));
          setLoading(false);
        },
        (error) => {
          console.error(error.text);
          setNotification((prev) => ({
            ...prev,
            error: true,
            message: t("contactFormNotificationError"),
            success: false,
            visible: true,
          }));
          setLoading(false);
        }
      );
  };
  return {
    operations: { register, handleSubmit, onSubmit },
    models: { loading, errors, formRef },
  };
}
