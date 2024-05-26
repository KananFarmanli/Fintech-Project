import { useTranslation } from "react-i18next";
import useContactForm from "../../hooks/useContactForm";

const ContactForm = () => {
  const {
    operations: { handleSubmit, onSubmit, register },
    models: { errors, formRef, loading },
  } = useContactForm();
  const { t } = useTranslation();
  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-3 items-start w-[350px]  mx-auto    justify-center "
      >
        <div className="flex flex-col gap-3 w-full">
          <label className="flex flex-col gap-2  font-semibold  text-xs sm:text-sm lg:text-base ">
            <p>
              {t("contactFormName")}: <span className="required-mark">*</span>
            </p>
            <input
              id="name"
              {...register("name", { required: true })}
              className="rounded  px-2 py-1 text-black w-full"
            />
          </label>
          <label className=" flex flex-col gap-2  font-semibold  text-xs sm:text-sm lg:text-base ">
            <p>
            {t("contactFormEmail")}: <span className="required-mark">*</span>
            </p>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className=" rounded text-black  px-2 py-1 w-full"
            />
          </label>
        </div>
        <label className=" relative flex flex-col gap-2  text-xs font-semibold sm:text-sm lg:text-base w-full">
          <p>
          {t("contactFormMessage")}: <span className="required-mark">*</span>
          </p>
          <textarea
            className="message-field rounded text-black px-2 py-1  w-full "
            cols={29}
            rows={5}
            {...register("message", { required: true })}
          />
          {(errors.name || errors.email || errors.message) && (
            <span className="absolute top-[165px] left-0 error-message text-base">
              *{t("RequiredFieldsMessage")}
            </span>
          )}
        </label>

        <button
          disabled={loading}
          className={`submit-button flex items-center justify-center  self-center mt-14 hover:bg-blueSection transition rounded px-1  py-1 max-w-[500px] bg-[#ff0000] min-w-[150px] text-sm sm:text-base  ${
            !loading || "hover:bg-slate-500 bg-slate-500"
          }`}
        >
          {!loading ? t("SendBtn") : <div className="lds-dual-ring"></div>}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
