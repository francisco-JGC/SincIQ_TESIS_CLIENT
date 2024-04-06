export const formatPrice = (price?: number) => {
  const cordobas = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NIO',
  }).format(price || 0)

  return cordobas.replace('NIO', 'C$')
}
