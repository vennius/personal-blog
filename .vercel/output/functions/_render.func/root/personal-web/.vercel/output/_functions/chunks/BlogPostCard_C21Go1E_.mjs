import { k as createComponent, l as renderTemplate, n as addAttribute, p as renderHead, q as renderComponent, t as renderSlot, o as createAstro } from './astro/server__1EOWs2C.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                        */
import { N as Nav, F as Footer } from './Footer_BSRB84Mw.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/logo.jpg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="font-sans"> ${renderComponent($$result, "Nav", Nav, { "pathName": Astro2.url.pathname, "client:load": true, "client:component-hydration": "load", "client:component-path": "/root/personal-web/src/components/Nav.tsx", "client:component-export": "default" })} <div class="px-4 selection:bg-yellow-300"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", Footer, {})} </div> </body></html>`;
}, "/root/personal-web/src/layouts/Layout.astro", void 0);

function BlogPostCard({ title, link, icon }) {
  return /* @__PURE__ */ jsx("a", { className: "space-y-4", href: link, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center", children: [
    /* @__PURE__ */ jsx("img", { className: "rounded-md w-12", src: icon, alt: "blog post" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-semibold", children: title })
  ] }) });
}

export { $$Layout as $, BlogPostCard as B };
