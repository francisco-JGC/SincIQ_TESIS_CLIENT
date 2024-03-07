import dashboardIcon from '@/assets/icons/dashboard_item.svg'
import chartIcon from '@/assets/icons/chart_item_menu.svg'
import plus_circleIcon from '@/assets/icons/plus_circle.svg'
import productIcon from '@/assets/icons/product_icon.svg'

export const NAVIGATION_ITEMS = [
  {
    title: 'Panel de control',
    href: '/dashboard',
    icon: dashboardIcon,
    segment: 'dashboard',
  },
  {
    title: 'Estadísticas de ventas',
    href: '/statistics-sales',
    icon: chartIcon,
    segment: 'statistics-sales',
  },
  {
    title: 'Mis productos',
    href: '/products',
    icon: productIcon,
    segment: 'products',
  },
  {
    title: 'Crear producto',
    href: '/create-product',
    icon: plus_circleIcon,
    segment: 'create-product',
  },
]
