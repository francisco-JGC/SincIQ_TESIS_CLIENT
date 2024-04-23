import dashboardIcon from '@/assets/icons/dashboard_item.svg'
import chartIcon from '@/assets/icons/chart_item_menu.svg'
import plus_circleIcon from '@/assets/icons/plus_circle.svg'
import productIcon from '@/assets/icons/product_icon.svg'
import salesIcon from '@/assets/icons/sales.svg'

export const NAVIGATION_ITEMS = [
  {
    title: 'Panel de control',
    href: '/dashboard',
    icon: dashboardIcon,
    segment: 'dashboard',
  },
  {
    title: 'Ventas',
    href: '/dashboard/sales',
    icon: salesIcon,
    segment: 'sales',
  },
  {
    title: 'Estadísticas de ventas',
    href: '/dashboard/statistics-sales',
    icon: chartIcon,
    segment: 'statistics-sales',
  },
  {
    title: 'Catálogo',
    href: '/dashboard/catalogue',
    icon: productIcon,
    segment: 'catalogue',
  },
  {
    title: 'Crear producto',
    href: '/dashboard/create-product',
    icon: plus_circleIcon,
    segment: 'create-product',
  },
]
