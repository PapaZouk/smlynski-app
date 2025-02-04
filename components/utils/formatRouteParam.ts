import { PageProps } from "$fresh/server.ts";

export const formatRouteParam = (props: PageProps): string => {
  const url = new URL(props.url);
  const pathElements = url.pathname.split("/").filter(Boolean);
  return pathElements[pathElements.length - 1].split("?")[0];
};
