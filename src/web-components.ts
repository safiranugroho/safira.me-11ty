import Ball from './lib/doodles/Ball/index.svelte'
import Filter from './lib/doodles/Filter/index.svelte'
import Keyboard from './lib/doodles/Keyboard/index.svelte'
import Position from './lib/doodles/Position/index.svelte'
import Rps from './lib/doodles/Rps/index.svelte'
import TipCalculator from './lib/doodles/TipCalculator/index.svelte'
import Weather from './lib/doodles/Weather/index.svelte'
import type { SvelteComponent } from 'svelte'

import './fonts.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defineCustomElement(name: string, Component: any) {
  customElements.define(
    name,
    class extends HTMLElement {
      _element: SvelteComponent;
      
      constructor() {
        super()
    
        // Create the shadow root.
        const shadowRoot = this.attachShadow({ mode: 'open' })
    
        // Instantiate the Svelte Component
        this._element = new Component({
          // Tell it that it lives in the shadow root
          target: shadowRoot,
        })
      }
      disconnectedCallback(): void {
        // Destroy the Svelte component when this web component gets
        // disconnected. If this web component is expected to be moved
        // in the DOM, then you need to use `connectedCallback()` and
        // set it up again if necessary.
        this._element?.$destroy();
      }
    }
  )
}

const doodles = [
  {
    slug: 'position',
    title: 'CSS position',
    description: "No flex, no grid, just position.",
    date: new Date('2023-02-01'),
    component: Position,
    screen: ['all']
  },
  {
    slug: 'filter',
    title: 'CSS filter',
    description: "Explore CSS filter() via the sliders.",
    date: new Date('2023-01-22'),
    component: Filter,
    screen: ['all']
  },
  {
    slug: 'ball',
    title: 'Ball',
    description: "IDK - it's just a bouncing ball.",
    date: new Date('2023-01-21'),
    component: Ball,
    screen: ['all']
  },
  {
    slug: 'rps',
    title: 'Rock paper scissors',
    description: "Shoot!",
    date: new Date('2023-01-19'),
    component: Rps,
    screen: ['all']
  },
  {
    slug: 'weather',
    title: 'Weather forecast',
    description: "What's the weather like today?",
    date: new Date('2023-01-18'),
    component: Weather,
    screen: ['desktop']
  },
  {
    slug: 'tip-calculator',
    title: 'Tip calculator',
    description: "Input the bill amount and number of people, and select a tip percentage.",
    date: new Date('2023-01-17'),
    component: TipCalculator,
    screen: ['desktop']
  },
  {
    slug: 'keyboard',
    title: 'Keyboard',
    description: "My keyboard jiggle jiggles - press the key on your keyboard to stop the jiggle.",
    date: new Date('2023-01-16'),
    component: Keyboard,
    screen: ['desktop']
  }
];

doodles.forEach((d) => {
  defineCustomElement(`doodle-${d.slug}`, d.component);
});

module.exports = { doodles };