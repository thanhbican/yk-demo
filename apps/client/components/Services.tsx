import React from 'react'
import {
  IconBuildingBank,
  IconCashBanknote,
  IconCoin,
  IconCreditCard,
  IconReceipt,
  IconReceiptRefund,
  IconReceiptTax,
  IconRepeat,
  IconReport,
} from '@tabler/icons-react'

const mockData = [
  { title: 'Cân hàng', icon: IconCreditCard, color: 'violet' },
  // { title: 'Xe', icon: IconBuildingBank, color: 'indigo' },
  // { title: 'Transfers', icon: IconRepeat, color: 'blue' },
  // { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
  // { title: 'Receipts', icon: IconReceipt, color: 'teal' },
  // { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' },
  // { title: 'Reports', icon: IconReport, color: 'pink' },
  // { title: 'Payments', icon: IconCoin, color: 'red' },
  // { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
]

const Services = () => {
  const items = mockData.map((item) => (
    <li
      key={item.title}
      className="flex flex-col items-center justify-center h-[5.625rem] rounded-[.5rem] bg-[#f8f9fa]"
    >
      <item.icon color={item.color} size="2rem" />
      <h3>{item.title}</h3>
    </li>
  ))
  return (
    <section className="container mb-10">
      <h2 className="text-center text-3xl mb-4">
        <span className="text-blue font-bold">OUR</span> SERVICES
      </h2>
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-4">{items}</ul>
    </section>
  )
}

export default Services
