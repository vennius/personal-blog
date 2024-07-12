export default function BlogPostCard({ title, link, icon }: { title: string, link: string, icon: string }) {
  return (
    <a className="space-y-4" href={link}>
      <div className="flex gap-3 items-center">
        <img className="rounded-md w-12" src={icon} alt="blog post" />
        <p className="text-gray-500 font-semibold">{title}</p>
      </div>
      <div className="w-[90%] mx-auto h-0.5 bg-slate-900"></div>
    </a>
  )
}
