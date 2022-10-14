# Svelte-Dodge

Make components dodge the pointer.

## About

- Written in Svelte with Typescript
- No external 3rd party dependencies

## Installation

```
npm i -D svelte-dodge
```

## Usage

```svelte
<script>
  import { Dodge } from 'svelte-dodge'; 
</script>

<Dodge>
  <div>
    This dodges now
  </div>
</Dodge>
```

## Props

| Prop | Default |Description|
|-----|---------------|--------------|
|activationDistance|20|Activation distance in px.|
|box|100 each|Size of possible movement area (additional to element size) in px in the directions up, down, left and right.|
|debug|false|Show activation and movement area for debugging.|
|dodge|true|Toggle the movement.|
|duration|0.1|Transition duration in s when movement is triggered.|
|mode|'random-away'|See movement.|
|rate|10|Update rate on cursor position and movement trigger detection in ms.|

## Movement

Movement is triggered whenever the cursor moves inside the activation area. It is also triggered when a click happens in the activation area. Movement can be disabled with the 'dodge' flag.

| Value |Description|
|-----|--------------|
|'random'|Move to random spot im movement area when triggered.|
|'random-away'|Move to random spot im movement area when triggered. Make sure the cursor is not inside element after moving.|


