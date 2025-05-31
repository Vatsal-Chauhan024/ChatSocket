import type { ButtonHTMLAttributes } from "react"

interface CommunButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    content: string
    className?: string
}

const CommonButton = ({content, className,  ...props}: CommunButtonProps) => {
  return (
    <button className={className} {...props}>
        {content}
    </button>
  )
}

export default CommonButton