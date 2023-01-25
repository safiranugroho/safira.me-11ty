interface Rule {
  text: string;
  moves: boolean;
  stacks: string;
}

export default {
  static: {
    text: 'as is.',
    moves: false,
    stacks: 'never'
  },
  relative: {
    text: 'relative to itself.',
    moves: true,
    stacks: 'when z-index is not auto'
  },
  absolute: {
    text: 'relative to its parent.',
    moves: true,
    stacks: 'when z-index is not auto'
  },
  fixed: {
    text: 'relative to the viewport.',
    moves: true,
    stacks: 'always'
  },
  sticky: {
    text: 'so it keeps its position on scroll.',
    moves: true,
    stacks: 'always'
  }
} as { [key: string]: Rule };
