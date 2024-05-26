import LoadingSpinner from "../loading/LoadingSpinner";

export default function CardsPending({ img }: { img: string }) {
  return (
    <div className={`card`}>
      <div className=" bg-black z-20 bg-opacity-75 absolute left-0 top-0 w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
      <div className={`card__wrapper `}>
        <div>
          <div className={`bot-logo bot-logo-loading`}>
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
