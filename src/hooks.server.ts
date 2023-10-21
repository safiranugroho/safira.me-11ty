import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event }) => {	
  const url = dev ? 'http://localhost:3000' : 'https://safira.me';
  return Response.redirect(`${url}/doodles${event.url.pathname}`, 308);
};