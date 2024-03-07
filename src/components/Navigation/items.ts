import dashboardIcon from '@/assets/icons/dashboard_item.svg'
import chartIcon from '@/assets/icons/chart_item_menu.svg'
import plus_circleIcon from '@/assets/icons/plus_circle.svg'
import productIcon from '@/assets/icons/product_icon.svg'

export const NAVIGATION_ITEMS = [
  {
    title: 'Panel de control',
    href: 'dashboard',
    icon: dashboardIcon,
  },
  {
    title: 'Estadísticas de ventas',
    href: 'statistics-sales',
    icon: chartIcon,
  },
  {
    title: 'Mis productos',
    href: 'products',
    icon: productIcon,
  },
  {
    title: 'Crear producto',
    href: 'create-product',
    icon: plus_circleIcon,
  },
]
