/* empty css                         */
import { k as createComponent, l as renderTemplate, n as addAttribute, p as renderHead, q as renderComponent, t as renderSlot, o as createAstro, u as unescapeHTML } from './astro/server__1EOWs2C.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                        */
import { N as Nav, F as Footer } from './Footer_BSRB84Mw.mjs';

const $$Astro = createAstro();
const $$BlogLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/logo.jpg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${frontmatter.title}</title>${renderHead()}</head> <body class="font-sans pb-10 relative"> ${renderComponent($$result, "Nav", Nav, { "pathName": Astro2.url.pathname, "client:load": true, "client:component-hydration": "load", "client:component-path": "/root/personal-web/src/components/Nav.tsx", "client:component-export": "default" })} <div class="px-4 selection:bg-yellow-300 prose-h1:text-3xl prose-headings:font-semibold prose-headings:my-2 prose-headings:mt-5 prose-pre:rounded-md prose-pre:mx-auto prose-pre:my-4 prose-pre:p-3 prose-a:text-blue-400 hover:prose-a:decoration-dashed hover:prose-a:decoration-blue-400 prose-a:underline prose-img:rounded-md prose-img:mx-auto prose-img:my-4 prose-ul:list-disc prose-ol:list-decimal prose-ul:mx-4 prose-ol:mx-4 prose-table:border-collapse prose-table:border prose-table:border-slate-500 prose-th:border prose-th:border-slate-700 prose-td:border prose-td:border-slate-600 prose-th:p-3 prose-td:text-center prose-th:no-underline relative sapce-y-15"> ${renderSlot($$result, $$slots["default"])} </div> ${renderComponent($$result, "Footer", Footer, {})} </body></html>`;
}, "/root/personal-web/src/layouts/BlogLayout.astro", void 0);

const html = "<h1 id=\"my-first-blog-post\">My First Blog Post</h1>\n<p>Created at: 12 July 2024</p>\n<h2 id=\"introduction\">Introduction</h2>\n<p>Welcome to my first blog post! In this post, I’ll share a bit about myself and what you can expect from this blog.</p>\n<h2 id=\"about-me\">About Me</h2>\n<p>I’m a senior high student with a passion for learning new technologies and sharing knowledge with others. When I’m not coding, I enjoy watching movies, playing games, scrolling social medias, and many more.</p>\n<h2 id=\"what-to-expect\">What to Expect</h2>\n<p>This blog will cover a variety of topics, including:</p>\n<ul>\n<li><strong>My Life</strong>: I’ll share what i’m doing and what i’m building.</li>\n<li><strong>Tech news</strong>: I’ll discuss the latest trends and updates in the tech world.</li>\n<li><strong>Personal projects</strong>: I’ll showcase some of my personal projects and the challenges I faced while building them.</li>\n<li><strong>And many moree…</strong></li>\n</ul>\n<h2 id=\"last-things\">Last things</h2>\n<p>Oh ya, in the future, i’m not gonna write my blogs in English, the reason is my English is suck.I will write my blogs in Indonesian, because it’s my main language.One more thing, I’m not good at gramarring and picking the right words, i’m still learning how to write a better writings, so dont judge me 🙏</p>";

				const frontmatter = {"layout":"../../layouts/BlogLayout.astro","title":"My first blog","icon":"/images/first-blog-icon.png","created_at":"12 July 2024"};
				const file = "/root/personal-web/src/pages/blog/test.md";
				const url = "/blog/test";
				function rawContent() {
					return "\n# My First Blog Post\nCreated at: 12 July 2024\n\n## Introduction\n\nWelcome to my first blog post! In this post, I'll share a bit about myself and what you can expect from this blog.\n\n## About Me\n\nI'm a senior high student with a passion for learning new technologies and sharing knowledge with others. When I'm not coding, I enjoy watching movies, playing games, scrolling social medias, and many more.\n\n## What to Expect\n\nThis blog will cover a variety of topics, including:\n\n- **My Life**: I'll share what i'm doing and what i'm building.\n- **Tech news**: I'll discuss the latest trends and updates in the tech world.\n- **Personal projects**: I'll showcase some of my personal projects and the challenges I faced while building them.\n- **And many moree...**\n\n## Last things\nOh ya, in the future, i'm not gonna write my blogs in English, the reason is my English is suck.I will write my blogs in Indonesian, because it's my main language.One more thing, I'm not good at gramarring and picking the right words, i'm still learning how to write a better writings, so dont judge me 🙏\n\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"my-first-blog-post","text":"My First Blog Post"},{"depth":2,"slug":"introduction","text":"Introduction"},{"depth":2,"slug":"about-me","text":"About Me"},{"depth":2,"slug":"what-to-expect","text":"What to Expect"},{"depth":2,"slug":"last-things","text":"Last things"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$BlogLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
