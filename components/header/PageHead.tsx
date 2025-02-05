import { h } from 'preact';
import {Head} from "$fresh/src/runtime/head.ts"

export default function PageHead(): h.JSX.Element {
    const pageTitle = Deno.env.get("COMPANY_NAME") || "";
    const pageSubtitle = Deno.env.get("COMPANY_SUBTITLE") || "";

    return (
        <Head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{pageTitle}{pageSubtitle && ` - ${pageSubtitle}`}</title>
            <link rel="stylesheet" href="/styles.css" />
        </Head>
    )
}