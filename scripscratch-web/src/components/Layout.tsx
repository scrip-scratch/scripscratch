import { Header } from "./Header";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
