export const NavItem = ({ children,estilo }) => {
  return (
    <li className={`flex items-center gap-2  flex-row ${estilo}`}>
      {children}
    </li>
  )
}