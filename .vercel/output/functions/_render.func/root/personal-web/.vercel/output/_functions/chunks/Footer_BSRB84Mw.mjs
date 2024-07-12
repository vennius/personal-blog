import { jsxs, jsx } from 'react/jsx-runtime';

function Nav({ pathName }) {
  const links = [
    { name: "Home", path: "/", isActive: false },
    { name: "Blog", path: "/blog", isActive: false }
  ];
  return /* @__PURE__ */ jsxs("nav", { className: "flex justify-between m-4 items-center", children: [
    /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("img", { src: "/logo.jpg", className: "w-8 rounded-md", alt: "pp" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4 text-gray-600 font-medium", children: links.map((el, i) => /* @__PURE__ */ jsx("a", { href: el.path, className: pathName == el.path ? "underline text-gray-800 font-semibold" : "", children: el.name }, i)) })
  ] });
}

function Footer() {
  return /* @__PURE__ */ jsxs("div", { className: "w-screen flex flex-col items-center justify-center px-3 py-3 text-gray-400 absolute bottom-0", children: [
    "Made with ",
    "<3",
    " by Stevennius"
  ] });
}

export { Footer as F, Nav as N };
