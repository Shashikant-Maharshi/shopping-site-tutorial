import { PropsWithChildren } from "react";
import './header.scss';

type HeaderProps = {
  title: string;
}
const Header = ({
  children,
  title,
}: PropsWithChildren<HeaderProps>) => (
  <header className="header">
    <span className='header__title'>{title}</span>
    <div className='header__controls'>
      {children}
    </div>
  </header>
);

export default Header;