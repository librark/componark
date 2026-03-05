<p align="center">
  <a href="https://codecov.io/gh/librark/componark">
    <img src="https://codecov.io/gh/librark/componark/graph/badge.svg?token=IWNapsPUch" alt="codecov" />
  </a>
</p>
<p align="center">
  <a href="https://codecov.io/gh/librark/componark">
    <img src="https://codecov.io/gh/librark/componark/graphs/sunburst.svg?token=IWNapsPUch" alt="coverage sunburst" />
  </a>
</p>

# ComponArk

Pragmatic Web Components Library

## Introduction

ComponArk is a lightweight Web Components library with a shared base class for
consistency and event-driven composition.

The library is organized as custom elements that can be used directly in HTML or
combined with your application code.

## Reference

- [Base Component](lib/base/component)
- [Showcase](showcase)

## Components library

> Components marked in **bold** are available in this repository.

- **`ark-audio`** ([docs](lib/components/audio/README.md))
- **`ark-camera`** ([docs](lib/components/camera/README.md))
- **`ark-capture`** ([docs](lib/components/capture/README.md))
- **`ark-droparea`** ([docs](lib/components/droparea/README.md))
- **`ark-emit`** ([docs](lib/components/emit/README.md))
- **`ark-list`** ([docs](lib/components/list/README.md))
- **`ark-paginator`** ([docs](lib/components/paginator/README.md))
- **`ark-spinner`** ([docs](lib/components/spinner/README.md))
- **`ark-splitview`** ([docs](lib/components/splitview/README.md))
- **`ark-translate`** ([docs](lib/components/translate/README.md))

## Why this exists

- Minimal, reusable base (`Component`) with lifecycle hooks and dependency
  resolution.
- Template/event binding helper (`listen`) with custom attribute syntax.
- Lightweight styling support with constructor stylesheet + fallback support.
- Small test surface included with native Node test runner.

## Basic usage

```html
<ark-translate languages="en,es"></ark-translate>

<span data-i18n="hello">Hello</span>
```

## Development

- Run tests: `npm test`
- Build production bundle: `npm run prod`
- Start local dev server: `npm run dev`

## Notes

Some older docs in the previous release referenced components that are not in the
current snapshot of this repository. If you need one of those modules, check
the release tags or open a request with expected parity.
