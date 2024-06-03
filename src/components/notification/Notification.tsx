import { useEffect, useState } from 'react';
import { useStateProvider } from '../../context/StateProvider';
import {
  errorIcon,
  successIcon,
  notifyIcon,
} from '../../assets/notification/index';

const Notification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    operations: { setNotification },
    models: { notification },
  } = useStateProvider();

  useEffect(() => {
    let timeout: any;

    if (notification.visible) {
      setIsVisible(true);
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }

    return () => clearTimeout(timeout!);
  }, [notification.visible]);

  useEffect(() => {
    let timeout: any;

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
    transform: ` translateX(${isVisible ? '-50%' : '150%'})`,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  const actionIcon = notification.error
    ? errorIcon
    : notification.success
    ? successIcon
    : notifyIcon;

  const actionBorder = notification.error
    ? 'border-red-400'
    : notification.success
    ? 'border-greenSection'
    : 'border-blueSection';

  return (
    <div
      style={containerStyle}
      onClick={() => setIsVisible(false)}
      className={`fixed top-[200px] left-1/2 -translate-x-1/2 z-[100] w-[250px] sm:w-[350px] h-[200px] sm:h-[150px]  p-1 sm:p-2
       bg-darkNavy text-white items-center justify-center border-[2px] rounded-lg 
      ${actionBorder}`}
    >
      <div className="z-[200] flex flex-col gap-5 w-full h-full items-center justify-center ">
        <div className="w-[50px]">
          <img src={actionIcon} alt="Checkmark" className="w-full h-auto" />
        </div>
        <div className=" text-center">
          <p className="font-light text-xs  md:text-sm">{notification.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
