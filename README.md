### figvar2dtcg

Export Figma variables to JSON in the [Design Tokens Community Group](https://tr.designtokens.org/format/) format using a flexible, extensible API.

This package is fully typed and works with both ESM and CommonJS modules.

## Why use this?

Design systems often require synchronizing tokens from Figma to code. And access to Figma Enterprise plan and Variables REST API is not always possible. Existing plugins might work for most cases, but what if you need something custom?
- Exclude certain tokens?
- Use a specific color format?
- Map dimensions in a unique way?
- Build a company-specific plugin with full control?

`figvar2dtcg` gives you the power to tailor your workflow.

DTCG Tokens format can be then utilzed by other tools, like [style-dictionary](https://styledictionary.com/)

## Getting started

### Basic usage
Export all token collections to DTCG format:

```typescript
import { figvar2dtcg, type DesignTokensFormat } from 'figvar2dtcg'

(async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const tokens: Record<string, DesignTokensFormat> = {}

  for (let collection of collections) {
    tokens[collection.name] = await figvar2dtcg(collection)
  }

  console.log(tokens)
})()
```

### Resolving values for a mode

Automatically resolve token values for a specific mode, including aliases, by following connected collections:

```typescript
import { figvar2dtcg } from 'figvar2dtcg'
import { getColorsCollection } from './get-colors-collection'

(async () => {
  const collection = await getColorsCollection()
  const tokens = await figvar2dtcg(collection, 'Dark') // Specify the mode name
})()
```

### Using aliases or final values

Control whether to use final values or aliases:

```typescript
import { figvar2dtcg } from 'figvar2dtcg'
import { getColorsCollection } from './get-colors-collection'

(async () => {
  const collection = await getColorsCollection()

  const withValues = await figvar2dtcg(collection, undefined, { resolveAliases: true })
  const withAliases = await figvar2dtcg(collection, undefined, { resolveAliases: false })

  console.log(withValues)
  console.log(withAliases)
})()
```

---

### Custom token names

Use custom name resolvers to modify token names (e.g., replace `/` with `.`, change case). Resolvers can be asynchronous:

```typescript
import { figvar2dtcg, nameResolvers } from 'figvar2dtcg'
import { kebabCase } from 'case'

(async () => {
  const collection = await getColorsCollection()
  const tokens = await figvar2dtcg(collection, undefined, {
    nameResolvers: [
      (variable) => kebabCase(variable.name),
      ...nameResolvers,
    ],
  })

  console.log(tokens)
})()
```

---

### Custom token values

Define custom resolvers to adjust token values. For example, use `hsl()` for colors or modify dimensions:

```typescript
import { figvar2dtcg, valueResolvers } from 'figvar2dtcg'
import { convertToHsl } from './colors'

(async () => {
  const collection = await getColorsCollection()
  const modeId = collection.defaultModeId

  const tokens = await figvar2dtcg(collection, undefined, {
    valueResolvers: [
      ...valueResolvers,
      (value, type, variable) => {
        if (type === 'color') return convertToHsl(variable.valuesForMode[modeId])
      },
    ],
  })

  console.log(tokens)
})()
```

---

### Custom token types

Set custom types for tokens, which can then be used in value resolvers:

```json
{
  "colors": {
    "button": {
      "$type": "myCustomType",
      "$value": "..."
    }
  }
}
```

```typescript
import { figvar2dtcg, typeResolvers } from 'figvar2dtcg'

(async () => {
  const collection = await getColorsCollection()

  const tokens = await figvar2dtcg(collection, undefined, {
    typeResolvers: {
      ...typeResolvers,
      myCustomType: (variable) => variable.scopes.includes('ALL_SCOPES'),
    },
  })

  console.log(tokens)
})()
```
