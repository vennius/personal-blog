export default function Button({ onClick, children, className = "" }: { onClick?: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode | string, className: string }) {
  return (
    <button className={"px-2 py-2 text-sm rounded-md bg-gray-300 text-black" + className} onClick={onClick}>{children}</button>
  )
}
