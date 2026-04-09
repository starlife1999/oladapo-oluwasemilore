# Project Status

This workspace now contains two working React setups:

1. The original Create React App project in the workspace root.
2. A Vite migration project in the `vite-migration` folder.

## Stable CRA Setup

The root project was aligned to a more stable Create React App stack:

1. React 18.2.0
2. React DOM 18.2.0
3. `react-scripts` 5.0.1
4. Testing Library versions compatible with CRA 5

Node support is constrained in `package.json` to:

`>=18 <21`

Recommended runtime:

1. Node 20 LTS

Root project commands:

1. `npm start`
2. `npm test -- --watchAll=false`
3. `npm run build`

## Vite Migration

The Vite version of this app lives in `vite-migration`.

Vite project commands:

1. `cd vite-migration`
2. `npm run dev`
3. `npm run build`
4. `npm run lint`

## Notes

1. The original failure came from component files that ended up duplicated or effectively broken for Jest parsing.
2. The CRA app now passes tests and builds successfully.
3. The Vite migration also builds successfully.
