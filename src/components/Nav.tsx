export default function Nav({ pathName }: { pathName: string }) {
  const links = [
    { name: "Home", path: "/", isActive: false },
    { name: "Blog", path: "/blog", isActive: false },
  ]
  return (
    <nav className="flex justify-between m-4 items-center">
      <a href="/">
        <img src="/logo.jpg" className="w-8 rounded-md" alt="pp" />
      </a>
      <div className="flex gap-4 text-gray-600 font-medium">
        {links.map((el, i) => <a href={el.path} key={i} className={pathName == el.path ? "underline text-gray-800 font-semibold" : ""}>{el.name}</a>)}
      </div>
    </nav>
  )
}
