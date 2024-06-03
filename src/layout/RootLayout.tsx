import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer, Header } from "../components";
import Notification from "../components/notification/Notification";

export default function RootLayout() {
  
  return (
    <>
      <div className="flex flex-col min-h-screen h-full bg-darknavy relative ">
        <Notification />
        <Header />
        <main className="grow flex place-content-center">
          <Outlet />
        </main>
        <ScrollRestoration/>
        <Footer />
      </div>
    </>
  );
}
