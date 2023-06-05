import './button.scss'

type ButtonProps = {
  label: string;
  onClick: Function,
  className?: string
}

export const Button = ({label, onClick, className = ''}: ButtonProps) => {
  return (
    <div className={`button ${className}`} onClick={() => onClick()}>
      {label}
    </div>
  )
}