/* empty css                         */
import { k as createComponent, l as renderTemplate, q as renderComponent, o as createAstro, m as maybeRenderHead } from './astro/server__1EOWs2C.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as BlogPostCard, $ as $$Layout } from './BlogPostCard_C21Go1E_.mjs';
import { jsx } from 'react/jsx-runtime';

function Button({ onClick, children, className = "" }) {
  return /* @__PURE__ */ jsx("button", { className: "px-2 py-2 text-sm rounded-md bg-gray-300 text-black" + className, onClick, children });
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./blog/test.md": () => import('./test_STkRpfom.mjs')}), () => "./blog/*.md");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Stevennius' Blog" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-3"> <h2 class="font-bold text-3xl">Hai, Saya Stevennius Chandra ${"\u{1F44B}"}</h2> <p>Stevennius Chandra adalah seorang siswa SMA di salah satu sekolah yang ada di kota Medan.Dia sudah tertarik dengan pemrograman sejak kecil.Dia pertama kali belajar menulis kode program sejak kelas 8 SMP, sekitar 4 Tahun silam.</p> ${renderComponent($$result2, "Button", Button, { "className": "cursor-pointer" }, { "default": ($$result3) => renderTemplate` <a href="#" class="cursor-pointer font-semibold text-zinc-700">Whatsapp Contact</a> ` })} <div class="pt-7"> <div class="flex gap-3 items-center"> <h2 class="text-xl font-bold">Tulisan Saya</h2> ${renderComponent($$result2, "Button", Button, { "className": "cursor-pointer" }, { "default": ($$result3) => renderTemplate` <a href="/blog" class="cursor-pointer font-semibold text-zinc-700">Show More</a> ` })} </div> <div class="mt-5 space-y-3"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "BlogPostCard", BlogPostCard, { "title": post.frontmatter.title, "link": post.url, "icon": post.frontmatter.icon })}`)} </div> </div> </div> ` })}`;
}, "/root/personal-web/src/pages/index.astro", void 0);

const $$file = "/root/personal-web/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
