import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './astro/server__1EOWs2C.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CcsvYRQE.css"},{"type":"inline","content":"@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-cyrillic-ext-400-normal.tyfMZHQw.woff2) format(\"woff2\"),url(/_astro/inter-cyrillic-ext-400-normal.CzG7Kr3z.woff) format(\"woff\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-cyrillic-400-normal.Df6ckaLK.woff2) format(\"woff2\"),url(/_astro/inter-cyrillic-400-normal.JrS_4yms.woff) format(\"woff\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-greek-ext-400-normal.CIdlr5YK.woff2) format(\"woff2\"),url(/_astro/inter-greek-ext-400-normal._Rr29XE2.woff) format(\"woff\");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-greek-400-normal.DQXyrmoy.woff2) format(\"woff2\"),url(/_astro/inter-greek-400-normal.DvIPHDQ7.woff) format(\"woff\");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-vietnamese-400-normal.Cnt0N5Vm.woff2) format(\"woff2\"),url(/_astro/inter-vietnamese-400-normal.DIOGfGLL.woff) format(\"woff\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-latin-ext-400-normal.D3W-OpO-.woff2) format(\"woff2\"),url(/_astro/inter-latin-ext-400-normal.8tIzm-yw.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-latin-400-normal.BT1H-PT_.woff2) format(\"woff2\"),url(/_astro/inter-latin-400-normal.Cdi8t5Mu.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"}],"routeData":{"route":"/blog/test","isIndex":false,"type":"page","pattern":"^\\/blog\\/test\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/test.md","pathname":"/blog/test","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CcsvYRQE.css"},{"type":"inline","content":"@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-cyrillic-ext-400-normal.tyfMZHQw.woff2) format(\"woff2\"),url(/_astro/inter-cyrillic-ext-400-normal.CzG7Kr3z.woff) format(\"woff\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-cyrillic-400-normal.Df6ckaLK.woff2) format(\"woff2\"),url(/_astro/inter-cyrillic-400-normal.JrS_4yms.woff) format(\"woff\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-greek-ext-400-normal.CIdlr5YK.woff2) format(\"woff2\"),url(/_astro/inter-greek-ext-400-normal._Rr29XE2.woff) format(\"woff\");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-greek-400-normal.DQXyrmoy.woff2) format(\"woff2\"),url(/_astro/inter-greek-400-normal.DvIPHDQ7.woff) format(\"woff\");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-vietnamese-400-normal.Cnt0N5Vm.woff2) format(\"woff2\"),url(/_astro/inter-vietnamese-400-normal.DIOGfGLL.woff) format(\"woff\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-latin-ext-400-normal.D3W-OpO-.woff2) format(\"woff2\"),url(/_astro/inter-latin-ext-400-normal.8tIzm-yw.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-latin-400-normal.BT1H-PT_.woff2) format(\"woff2\"),url(/_astro/inter-latin-400-normal.Cdi8t5Mu.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CcsvYRQE.css"},{"type":"inline","content":"@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-cyrillic-ext-400-normal.tyfMZHQw.woff2) format(\"woff2\"),url(/_astro/inter-cyrillic-ext-400-normal.CzG7Kr3z.woff) format(\"woff\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-cyrillic-400-normal.Df6ckaLK.woff2) format(\"woff2\"),url(/_astro/inter-cyrillic-400-normal.JrS_4yms.woff) format(\"woff\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-greek-ext-400-normal.CIdlr5YK.woff2) format(\"woff2\"),url(/_astro/inter-greek-ext-400-normal._Rr29XE2.woff) format(\"woff\");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-greek-400-normal.DQXyrmoy.woff2) format(\"woff2\"),url(/_astro/inter-greek-400-normal.DvIPHDQ7.woff) format(\"woff\");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-vietnamese-400-normal.Cnt0N5Vm.woff2) format(\"woff2\"),url(/_astro/inter-vietnamese-400-normal.DIOGfGLL.woff) format(\"woff\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-latin-ext-400-normal.D3W-OpO-.woff2) format(\"woff2\"),url(/_astro/inter-latin-ext-400-normal.8tIzm-yw.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/inter-latin-400-normal.BT1H-PT_.woff2) format(\"woff2\"),url(/_astro/inter-latin-400-normal.Cdi8t5Mu.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/root/personal-web/src/pages/blog/test.md",{"propagation":"none","containsHead":true}],["/root/personal-web/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/root/personal-web/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/blog/test@_@md":"pages/blog/test.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","/root/personal-web/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/root/personal-web/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_Bt6ngp0F.mjs","/src/pages/blog/test.md":"chunks/test_STkRpfom.mjs","/src/pages/blog/index.astro":"chunks/index_DpHbjzF2.mjs","/src/pages/index.astro":"chunks/index_CzmMWlaJ.mjs","\u0000@astrojs-manifest":"manifest_CQn11kbd.mjs","/root/personal-web/src/components/Nav.tsx":"_astro/Nav.Cgg-MbjL.js","@astrojs/react/client.js":"_astro/client.BIGLHmRd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/inter-vietnamese-400-normal.Cnt0N5Vm.woff2","/_astro/inter-cyrillic-ext-400-normal.tyfMZHQw.woff2","/_astro/inter-greek-ext-400-normal.CIdlr5YK.woff2","/_astro/inter-greek-400-normal.DQXyrmoy.woff2","/_astro/inter-latin-ext-400-normal.D3W-OpO-.woff2","/_astro/inter-cyrillic-400-normal.Df6ckaLK.woff2","/_astro/inter-latin-400-normal.BT1H-PT_.woff2","/_astro/inter-vietnamese-400-normal.DIOGfGLL.woff","/_astro/inter-greek-400-normal.DvIPHDQ7.woff","/_astro/inter-greek-ext-400-normal._Rr29XE2.woff","/_astro/inter-cyrillic-ext-400-normal.CzG7Kr3z.woff","/_astro/inter-latin-ext-400-normal.8tIzm-yw.woff","/_astro/inter-cyrillic-400-normal.JrS_4yms.woff","/_astro/inter-latin-400-normal.Cdi8t5Mu.woff","/_astro/index.CcsvYRQE.css","/favicon.svg","/logo.jpg","/_astro/Nav.Cgg-MbjL.js","/_astro/client.BIGLHmRd.js","/_astro/index.DhYZZe0J.js","/images/first-blog-icon.png"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
