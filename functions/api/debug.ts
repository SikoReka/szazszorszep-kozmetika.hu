// functions/api/debug.ts
export const onRequestGet: PagesFunction<any> = async (context) => {
  const envKeys = Object.keys(context.env || {});
  const hasDB = !!context.env?.DB;

  return new Response(
    JSON.stringify({
      message: 'Cloudflare Pages Functions Environment Debug',
      envKeys,
      hasDB,
      url: context.request.url,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
