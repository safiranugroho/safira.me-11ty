import { writable } from 'svelte/store';
import keyboard from '$lib/assets/keyboard.png';
import tip from '$lib/assets/tip.png';
import weather from '$lib/assets/weather.png';
import rps from '$lib/assets/rps.png';
import ball from '$lib/assets/ball.png';
import filter from '$lib/assets/filter.png';

/** @type {Record<string, any>} */
export const doodles = {
  '/keyboard': {
    name: 'Keyboard',
    cover: keyboard,
    next: '/tip-calculator'
  },
  '/tip-calculator': {
    prev: '/keyboard',
    name: 'Tip calculator',
    cover: tip,
    next: '/weather'
  },
  '/weather': {
    prev: '/tip-calculator',
    name: 'Weather forecast',
    cover: weather,
    next: '/rps'
  },
  '/rps': {
    prev: '/weather',
    name: 'Rock paper scissors',
    cover: rps,
    next: '/ball'
  },
  '/ball': {
    prev: '/rps',
    name: 'Ball',
    cover: ball,
    next: '/filter'
  },
  '/filter': {
    prev: '/ball',
    name: 'CSS filter',
    cover: filter
  }
};

export const pageName = writable('Doodles by Safira');
