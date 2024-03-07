import Image from 'next/image'
import './index.scss'
import { NAVIGATION_ITEMS } from './items'
import NavLink from './navLink'

export const Navigation = () => {
  return (
    <ul className="navigation__list">
      {NAVIGATION_ITEMS.map((item, index) => (
        <li key={index} className="navigation__item">
          <NavLink href={item.href} segment={item.segment}>
            <Image
              src={item.icon}
              alt={item.title}
              width={24}
              height={24}
              typeof="svg"
            />
            <span>{item.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
