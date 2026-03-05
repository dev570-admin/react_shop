type NavMenuProps = {
  links: string[];
  isOpen?: boolean;
};

function NavMenu({ links, isOpen = false }: NavMenuProps) {
  return (
    <nav className={`nav ${isOpen ? 'open' : ''}`}>
      {links.map((link) => (
        <a key={link} href="#">
          {link}
        </a>
      ))}
    </nav>
  );
}

export default NavMenu;