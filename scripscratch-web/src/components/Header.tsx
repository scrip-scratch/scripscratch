import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";

export const Header = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <HeaderLogo />
        <HeaderNav />
      </div>
    </header>
  );
};
