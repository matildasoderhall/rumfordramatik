import { Outlet } from "react-router";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
};