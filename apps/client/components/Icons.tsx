import Image from 'next/image'
import Logo from '@/public/images/logo.png'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  GripHorizontal,
  Loader2,
  LucideProps,
  MailOpen,
  MapPin,
  Menu,
  Minus,
  Phone,
  Pizza,
  ShoppingCart,
  X,
  type LucideIcon,
} from 'lucide-react'
import { BsCartPlus } from 'react-icons/bs'

export type Icon = LucideIcon

export const Icons = {
  check: Check,
  logo: ({ ...props }: LucideProps) => {
    return (
      <div>
        <Image width={40} height={20} src={Logo} alt="YK" />
      </div>
    )
  },
  close: X,
  menu: Menu,
  chevronRight: ChevronRight,
  pizza: Pizza,
  cart: ShoppingCart,
  cartPlus: BsCartPlus,
  phone: Phone,
  location: MapPin,
  email: MailOpen,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  grid: GripHorizontal,
  minus: Minus,
}
