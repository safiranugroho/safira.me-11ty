import { writable } from 'svelte/store';

export const generateCssVarsForClass = (s: Style) =>
  Object.entries(s).reduce((a, [k, v]) => `${a}--${k}: ${v.toText()};`, '');

export const generateCssVars = (s: Styles) => ({
  parent: generateCssTextForClass(s.parent),
  child: generateCssTextForClass(s.child)
});

export const generateCssTextForClass = (s: Style) =>
  Object.entries(s).reduce((a, [k, v]) => `${a}${k}: ${v.toText()};\n${' '.repeat(2)}`, '');

export const generateCssText = (s: Styles) => `
.parent {
  overflow: scroll;
  ${generateCssTextForClass(s.parent)}
}

.child {
  ${generateCssTextForClass(s.child)}
}`;

export interface Property {
  value: string | number;
  unit: string;
  toText: Function;
  update: Function;
}

export interface Offsets {
  top?: Property;
  bottom?: Property;
  left?: Property;
  right?: Property;
}

export type Style = Offsets & {
  position: Property;
};

export interface Styles {
  parent: Style;
  child: Style;
}

export const P = (value: string | number, unit: string = '') => ({
  value,
  unit,
  toText: function (this: Property) {
    return `${this.value}${this.unit}`;
  },
  update: function (this: Property, value: string | number, unit: string = '') {
    this.value = value;
    this.unit = unit;
  }
});

export const defaultStyles: Styles = {
  parent: {
    position: P('static')
  },
  child: {
    position: P('static'),
    top: P('auto'),
    bottom: P('auto'),
    left: P('auto'),
    right: P('auto')
  }
};

export default writable(defaultStyles);
