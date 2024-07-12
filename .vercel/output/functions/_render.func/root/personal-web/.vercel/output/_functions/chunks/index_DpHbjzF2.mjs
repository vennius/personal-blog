/* empty css                         */
import { k as createComponent, l as renderTemplate, q as renderComponent, o as createAstro, m as maybeRenderHead } from './astro/server__1EOWs2C.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as BlogPostCard, $ as $$Layout } from './BlogPostCard_C21Go1E_.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./test.md": () => import('./test_STkRpfom.mjs')}), () => "./*.md");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog posts" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mt-5 space-y-3"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "BlogPostCard", BlogPostCard, { "title": post.frontmatter.title, "link": post.url, "icon": post.frontmatter.icon })}`)} </div> ` })}`;
}, "/root/personal-web/src/pages/blog/index.astro", void 0);

const $$file = "/root/personal-web/src/pages/blog/index.astro";
const $$url = "/blog";

export { $$Index as default, $$file as file, $$url as url };
