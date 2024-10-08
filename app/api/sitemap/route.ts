import { i18nConfig } from "@/app/constants";
import { readdir } from "fs/promises";
import { pathToFileURL } from "url";

export async function GET(req: Request) {
    const files = await readdir(pathToFileURL('app'), { recursive: true })
    const locs = files
        .filter(file => file.endsWith('page.tsx'))
        .filter(file => file.indexOf('[idx]') === -1)
        .map((file) => {
          let name = file.substring(0, file.indexOf('page.tsx'))
          if (name.indexOf('[locale]') === -1) {
            return `<url><loc>http://${req.headers.get('host')}/${name}</loc></url>`
          }
          
          return i18nConfig.locales.map((locale) => {
            const n = name.replace("[locale]", locale)
            return `<url><loc>http://${req.headers.get('host')}/${n}</loc></url>`
          }).join('\n')
        })

    const content = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locs.join('\n')}
    </urlset>`;
    return new Response(content, { headers: { "Content-Type": "text/xml" }})
}