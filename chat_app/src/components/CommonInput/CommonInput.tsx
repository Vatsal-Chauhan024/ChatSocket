import type { InputHTMLAttributes } from "react"

interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: 'text'
    className?: string
}

const CommonInput = ({type, className,  ...props}: CommonInputProps) => {
  return type === 'text' ? <input type="text"
  className={`w-full bg-white border border-solid border-slate-400  ${className}`}
  {...props} /> : null
}

export default CommonInput