// load function will return data for all pages under this layout

import { title } from "$lib/title";

/** @type {import('./$types').LayoutLoad} */
export async function load() {
  return {
    APP_NAME: "Guns of Icarus Library",
    title,
  };
}
