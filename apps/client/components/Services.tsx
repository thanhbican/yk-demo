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

interface ServicesProps {
  dict: any
}

const Services: React.FC<ServicesProps> = ({ dict }) => {
  const mockData = [
    { title: dict['Credit cards'], icon: IconCreditCard, color: 'violet' },
    { title: dict['Banks nearby'], icon: IconBuildingBank, color: 'indigo' },
    { title: dict['Transfers'], icon: IconRepeat, color: 'blue' },
    { title: dict['Refunds'], icon: IconReceiptRefund, color: 'green' },
    { title: dict['Receipts'], icon: IconReceipt, color: 'teal' },
    { title: dict['Taxes'], icon: IconReceiptTax, color: 'cyan' },
    { title: dict['Reports'], icon: IconReport, color: 'pink' },
    { title: dict['Payments'], icon: IconCoin, color: 'red' },
  ]
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
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">{items}</ul>
    </section>
  )
}

export default Services
