# Svelte-Dodge

Make components dodge the pointer.

<img src="./gif/demo.gif" alt="Demo Gif" height="190">

## About

- Written in Svelte with Typescript
- No external 3rd party dependencies
- Easy-to-use by just wrapping any element or component
- Dispatches movement events
- Multiple movement modes
- Supply custom movement functions using available helpers

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
|box|right 400, rest 0|Size of possible movement area (additional to element size) in px in the directions up, down, left and right.|
|customMovement|...|Supply a custom movement function. Set mode to 'custom' to use.|
|dodge|true|Toggle the movement.|
|duration|0.3|Transition duration in s when movement is triggered. If set to 0 no transition is used.|
|mode|'kite-flip'|See movement.|
|moveDistance|100|Additional movement in the desired direction when activated.|
|rate|0.1|Update rate on cursor position and movement trigger detection in ms. If set to 0 it uses the native browser rate.|

## Events

| Event | Description|
|-----|-----------------------------|
|move|Triggered whenever movement function is called with cursor close enough.|
|transitionstart|Triggered whenever element transition starts. Only if duration > 0.|
|transitionend|Triggered whenever element transition ends. Only if duration > 0.|

## Movement

Movement is triggered whenever the cursor moves inside the activation area. It is also triggered when a click happens in the activation area. Movement can be disabled with the 'dodge' flag.

| Value |Description|
|-----|--------------|
|'custom'|Use the custom prop to supply a custom movement function. It takes box, element and cursor and should output new x,y coordinates for the element.|
|'kite'|Move away from cursor. When edge of area is reached flip to other side of area.|
|'kite-flip'|Move away from cursor. When edge of area is reached flip to other side of cursor.|
|'random'|Move to random spot im movement area when triggered. Make sure the cursor is not inside element after moving.|


