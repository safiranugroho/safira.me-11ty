import Ball from './lib/doodles/Ball/index.svelte'
import Filter from './lib/doodles/Filter/index.svelte'
import Keyboard from './lib/doodles/Keyboard/index.svelte'
import PodcastEpisodes from './lib/doodles/PodcastEpisodes/index.svelte'
import Position from './lib/doodles/Position/index.svelte'
// import Rps from './lib/doodles/Rps/index.svelte'
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

defineCustomElement('doodle-ball', Ball)
defineCustomElement('doodle-filter', Filter)
defineCustomElement('doodle-keyboard', Keyboard)
defineCustomElement('doodle-podcast-episodes', PodcastEpisodes)
defineCustomElement('doodle-position', Position)
// defineCustomElement('doodle-rps', Rps)
defineCustomElement('doodle-tip-calculator', TipCalculator)
defineCustomElement('doodle-weather', Weather)