# Svelte-Dodge

Make components dodge the pointer.

## About

- Written in svelte with typescript
- No external 3rd party dependencies

## Props

| Prop | Values (default)|Description|
|-----|---------------|--------------|
|activationDistance|number (20)|Activation distance in pixels.|
|box|Object (100 each)|Size of possible movement area (additional to element size) in px in the directions up, down, left and right.|
|debug|boolean (false)|Show activation and movement area for debugging.|
|dodge|boolean (true)|Toggle the movement.|
|duration|number (0.1)|Transition duration when movement is triggered.|
|mode|string ('random-away')|See movement.|
|rate|number (10)|Update rate on cursor position and movement trigger detection.|

## Movement

Movement is triggered whenever the cursor moves inside the activation area. It is also triggered when a click happens in the activation area. Movement can be disabled with the 'dodge' flag.

| Value |Description|
|-----|--------------|
|'random'|Move to random spot im movement area when triggered.|
|'random-away'|Move to random spot im movement area where the cursor will be outside of element when triggered.|


