import base from "@/app/adapters/base";

const api = base.url("", true);
export default {
  getMetadataNft: (url: string) => {
    return api
      .url(url)
      .get()
      .json<any>((r) => r);
  },
};
