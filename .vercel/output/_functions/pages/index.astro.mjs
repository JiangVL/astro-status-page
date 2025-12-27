/* empty css                                 */
import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, k as renderComponent, h as addAttribute, l as renderHead } from '../chunks/astro/server_DRlVu98z.mjs';
import { z } from 'zod';
import { jsxs, jsx } from 'react/jsx-runtime';
import * as HoverCard from '@radix-ui/react-hover-card';
export { renderers } from '../renderers.mjs';

const monitorPeriodicity = [
  "30s",
  "1m",
  "5m",
  "10m",
  "30m",
  "1h",
  "other"
];
const periodicityEnum = z.enum(monitorPeriodicity);
const flyRegions = [
  "ams",
  "arn",
  "atl",
  "bog",
  "bom",
  "bos",
  "cdg",
  "den",
  "dfw",
  "ewr",
  "eze",
  "fra",
  "gdl",
  "gig",
  "gru",
  "hkg",
  "iad",
  "jnb",
  "lax",
  "lhr",
  "mad",
  "mia",
  "nrt",
  "ord",
  "otp",
  "phx",
  "qro",
  "scl",
  "sjc",
  "sea",
  "sin",
  "syd",
  "waw",
  "yul",
  "yyz",
  "koyeb_fra",
  "koyeb_was",
  "koyeb_sin",
  "koyeb_tyo",
  "koyeb_par",
  "koyeb_sfo",
  "railway_us-west2",
  "railway_us-east4-eqdc4a",
  "railway_europe-west4-drams3a",
  "railway_asia-southeast1-eqsg3a"
];
const monitorMethods = ["GET", "POST", "HEAD"];
const monitorSchema = z.object({
  id: z.number(),
  periodicity: periodicityEnum,
  url: z.string(),
  regions: z.array(z.enum(flyRegions)),
  name: z.string().nullable(),
  description: z.string().nullable(),
  method: z.enum(monitorMethods),
  body: z.string(),
  headers: z.array(z.object({ key: z.string(), value: z.string() })).default([]),
  active: z.boolean()
});
const monitorsSchema = z.array(monitorSchema);
const dailyStatsSchema = z.object({
  ok: z.number().int(),
  count: z.number().int(),
  day: z.string()
});
const dailyStatsSchemaArray = z.array(dailyStatsSchema);
const summaryPayload = z.object({ data: dailyStatsSchemaArray });

const OPERATIONAL = 0.98;
const DEGRADED = 0.9;
function getConfigByRatio(value) {
  if (isNaN(value)) {
    return {
      color: "bg-gray-300/90 hover:bg-gray-300",
      label: "Missing"
    };
  }
  if (value > OPERATIONAL)
    return {
      color: "bg-green-500/90 hover:bg-green-500",
      label: "Operational"
    };
  if (value > DEGRADED)
    return {
      color: "bg-yellow-500/90 hover:bg-yellow-500",
      label: "Degraded"
    };
  return {
    color: "bg-red-500/90 hover:bg-red-500",
    label: "Downtime"
  };
}
function Bar(props) {
  const ratio = props.ok / props.count;
  const date = new Intl.DateTimeFormat("en-US").format(new Date(props.day));
  const config = getConfigByRatio(ratio);
  const total = props.count;
  const failed = Math.abs(props.count - props.ok);
  return /* @__PURE__ */ jsxs(HoverCard.Root, { openDelay: 100, closeDelay: 100, children: [
    /* @__PURE__ */ jsx(HoverCard.Trigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: `${config.color} flex-1 h-10 rounded-md` }) }),
    /* @__PURE__ */ jsx(HoverCard.Portal, { children: /* @__PURE__ */ jsx(
      HoverCard.Content,
      {
        side: "bottom",
        align: "center",
        sideOffset: 4,
        className: "border rounded-md shadow-sm bg-white p-3",
        children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: config.label }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-between", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-light text-gray-900", children: date }) }),
          /* @__PURE__ */ jsx("div", { className: "my-1.5 h-px w-full bg-gray-100" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600", children: [
              /* @__PURE__ */ jsx("code", { className: "text-green-500", children: total }),
              " total requests"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600", children: [
              /* @__PURE__ */ jsx("code", { className: "text-red-500", children: failed }),
              " failed requests"
            ] })
          ] })
        ] })
      }
    ) })
  ] });
}

const $$Astro$1 = createAstro();
const $$StatusBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StatusBar;
  const { name, id, description } = Astro2.props;
  const API_KEY = "os_C6cEujukj1Cvdx7gsUhatD";
  const response = await fetch(`https://api.openstatus.dev/v1/monitor/${id}/summary`, {
    headers: {
      "x-openstatus-key": API_KEY,
      "Cache-Control": "max-age=600"
      // Cache for 10 minutes
    }
  });
  const data = await response.json();
  const result = summaryPayload.parse(data);
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-2 justify-between text-sm"> <div class="flex items-start gap-1 flex-col"> <div class="text-gray-900 line-clamp-1 font-semibold">${name}</div> ${description && renderTemplate`<div class="text-gray-600 shrink-0 font-light">${description}</div>`} </div> <div> <div class="flex flex-row gap-0.5"> ${result.data.reverse().map((stat) => {
    return renderTemplate`${renderComponent($$result, "Bar", Bar, { ...stat, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/fuwari/OpenStatus/src/components/bar", "client:component-export": "Bar" })}`;
  })} </div> <div class="flex items-center justify-between text-xs text-gray-600"> <p></p> <p>today</p> </div> </div> </div>`;
}, "D:/fuwari/OpenStatus/src/components/status-bar.astro", void 0);

const $$Callout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col border bg-gray-50 px-3 py-2 rounded-md my-8"> <p class="text-gray-900">Bring your own status page.
<a href="https://github.com/openstatusHQ/astro-status-page" target="_blank" class="text-gray-900 underline underline-offset-4 hover:no-underline after:content-['_↗']">Go fork it!</a> </p> </div>`;
}, "D:/fuwari/OpenStatus/src/components/callout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const runtime = Astro2.locals.runtime;
  const API_KEY = runtime?.env?.API_KEY || "os_C6cEujukj1Cvdx7gsUhatD";
  let result = [];
  let error = null;
  try {
    const response = await fetch("https://api.openstatus.dev/v1/monitor", {
      headers: {
        "x-openstatus-key": API_KEY,
        "Cache-Control": "max-age=600"
        // Cache for 10 minutes
      }
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to fetch monitors: ${response.status} ${response.statusText}. ${errorBody}`);
    }
    const data = await response.json();
    const r = monitorsSchema.parse(data);
    result = r;
  } catch (e) {
    console.error("Error fetching data:", e);
    error = e instanceof Error ? e.message : String(e);
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description" content="Fork your own astro status page for your openstatus workspace."><title>Status Page</title>${renderHead()}</head> <body class="flex min-h-screen w-full flex-col p-4 md:p-8"> <main class="flex h-full w-full flex-1 flex-col gap-4 mx-auto max-w-sm"> <div class="mx-auto flex w-full flex-col gap-6"> <div class="col-span-full flex items-start justify-between"> <div class="flex w-full flex-col gap-4"> <div> <h1 class="font-cal text-3xl">Astro Status Page</h1> <p class="text-gray-600">
An open source status page by OpenStatus
</p> </div> ${error ? renderTemplate`<div class="rounded-md bg-red-50 p-4"> <div class="flex"> <div class="ml-3"> <h3 class="text-sm font-medium text-red-800">Error loading status</h3> <div class="mt-2 text-sm text-red-700"> <p>${error}</p> </div> </div> </div> </div>` : renderTemplate`<div class="grid gap-2"> ${result.map((monitor) => renderTemplate`${renderComponent($$result, "StatusBar", $$StatusBar, { ...monitor })}`)} </div>`} </div> </div> </div> ${renderComponent($$result, "Callout", $$Callout, {})} <footer> <p class="text-gray-600 text-center text-sm">
powered by${" "} <a href="https://www.openstatus.dev" target="_blank" rel="noreferrer" class="text-gray-900 underline underline-offset-4 hover:no-underline">
openstatus.dev
</a> </p> </footer> </main> </body></html>`;
}, "D:/fuwari/OpenStatus/src/pages/index.astro", void 0);
const $$file = "D:/fuwari/OpenStatus/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
