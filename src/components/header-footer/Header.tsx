import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo/fintech.png";
import useHeader from "../../hooks/useHeader";
import { useTranslation } from "react-i18next";
import { FaGripLines } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import LanguageDropdown from "../language/LanguageDropdown";

export default function Header() {
  const { t } = useTranslation();

  const {
    operations: { openMenu },
    models: { showBanner, isMenuOpen, headerRef },
  } = useHeader();

  return (
    <header
      ref={headerRef}
      className={`header glass z-20 w-full sticky 
      ${ !isMenuOpen || "!rounded-bl-[18%] !rounded-br-[18%] "} 
      ${ location.pathname == "/" && isMenuOpen? "!h-[300px] " : (location.pathname != "/" && isMenuOpen) ? "!h-[110px]" : ""} 
        `}
    >
      <div
        className={` banner banner-bg ${!showBanner && " banner-deactive "}`}
      >
        <h1 className="w-full lg:w-1/2 text-center">
          <span className="text-violetSection font-semibold">
            {t("bannerPart1")}
          </span>{" "}
          {t("bannerPart2")}{" "}
          <span className="text-blueSection"> {t("bannerPart3")}</span>!
        </h1>
        <div className="w-full lg:w-1/2 max-w-[750px]">
          <img className="w-full h-auto" src={logoIcon} alt="" />
        </div>
      </div>

      <div
        className={`header__layer glass transition-all w-full ${
          !isMenuOpen || "!h-[min-content] !rounded-bl-[21%] !rounded-br-[21%] "
        }`}
      >
        <div className="header__wrapper p-[20px] sm:py-[40px] flex flex-col items-center justify-center gap-3 ">
          <nav
            className={`w-full items-center justify-center   sm:flex  ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            <ul className={`flex  flex-col sm:flex-row flex-wrap w-full gap-6 sm:gap-4 justify-center items-center text-[10px] md:text-[12px] lg:text-sm  sm:mb-0 
             ${ location.pathname != "/" || "mb-4"} 
            `}>
              {location.pathname === "/" ? (
                <>
                  <li data-link="1" className="link reflect">
                    <a href="#description">{t("description")}</a>
                  </li>
                  <li data-link="2" className="link reflect">
                    <a href="#about-company">{t("aboutCompany")}</a>
                  </li>
                  <li data-link="3" className="link reflect">
                    <a href="#advantages">{t("advantages")}</a>
                  </li>
                  <li data-link="4" className="link reflect">
                    <a href="#how-it-works">{t("howItWorks")}</a>
                  </li>
                  <li data-link="5" className="link reflect">
                    <Link to="/bot-usage">{t("botUsage")}</Link>
                  </li>
                  <li data-link="6" className="link reflect">
                    <Link to="/buy">{t("buy")}</Link>
                  </li>
                </>
              ) : (
                <li className="link reflect text-[10px] md:text-[12px] lg:text-sm">
                  <Link to="/">{t("back")}</Link>
                </li>
              )}
            </ul>

            <LanguageDropdown />
          </nav>

          <button
            onClick={openMenu}
            className="p-2 mx-auto menu-btn block sm:hidden"
          >
            {!isMenuOpen ? (
              <FaGripLines className="mx-auto menu w-6" />
            ) : (
              <FaRegWindowClose className="mx-auto menu w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
