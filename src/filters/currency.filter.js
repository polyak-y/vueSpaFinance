export default function (value, currency = 'RUB') {
  return new Intl.NumberFormat('ru-RU',{
    style: 'currency',
    currency: currency
  }).format(value)
}