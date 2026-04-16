export const NavItem = ({ children,estilo }) => {
  return (
    <li className={` relative flex items-center gap-2  flex-row ${estilo}`}>
      {children}
    </li>
  )
}