import { Icon } from './Icons'

interface ContactCardProps {
  title: string
  icon: Icon
  href: string
  target?: string
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  href,
  title,
  target,
}) => {
  return (
    <li>
      <a
        className="flex md:flex-col items-center p-4 font-bold rounded-[10px] h-full transition duration-300 md:hover:-translate-y-3 md:hover:shadow"
        href={href}
        target={target}
        rel="noopener"
      >
        {
          <Icon
            size={30}
            className="md:mb-5 w-28 shrink-0 md:w-auto"
            // fill="text-orange"
            color="#fff"
          />
        }
        <span className="text-white md:ml-0">{title}</span>
      </a>
    </li>
  )
}

export default ContactCard
