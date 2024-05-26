import { useEffect, useState } from "react";
import { useStateProvider } from "../../context/StateProvider";
import {errorIcon ,successIcon, notifyIcon} from "../../assets/notification/index"

const Notification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    operations: { setNotification },
    models: { notification },
  } = useStateProvider();

  useEffect(() => {
    let timeout: number | null;

    if (notification.visible) {
      setIsVisible(true);
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }

    return () => clearTimeout(timeout!);
  }, [notification.visible]);

  useEffect(() => {
    let timeout: number | null;

    if (notification.visible && !isVisible) {
      timeout = setTimeout(() => {
        setNotification((prev) => ({
          ...prev,
          visible: false,
        }));
      }, 100);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [notification.visible, isVisible]);

  const containerStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: ` translateX(${isVisible ? "-50%" : "100%"})`,
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };

  const actionIcon = notification.error
    ? errorIcon
    : notification.success
    ? successIcon
    : notifyIcon;

  const actionBorder = notification.error
    ? "border-red-400"
    : notification.success
    ? "border-greenSection"
    : "border-blueSection";

  return (
    <div
      style={containerStyle}
      onClick={() => setIsVisible(false)}
      className={`fixed top-[200px] left-1/2 -translate-x-1/2 z-[100] w-[500px] h-[200px] bg-[#143a72e6] text-white items-center justify-center border-[4px] rounded 
      ${actionBorder}`}
    >
      <div className="z-[200] flex flex-col gap-11 w-full h-full items-center justify-center ">
        <div className="w-[80px]">
          <img src={actionIcon} alt="Checkmark" className="w-full h-auto" />
        </div>
        <div className=" text-center">
          <p className="font-bold text-lg">{notification.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
