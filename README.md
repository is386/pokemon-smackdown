# pokemon-smackdown

A simulator for Pokemon battles written in Typescript

## Features

- Single battles
- Moves
  - Damage moves
  - Status effect moves
  - Stat increase/decrease moves
  - Recoil moves
  - Multi-strike moves
  - Critical hits
  - Physical/special split
- Status effects
  - Burn
  - Confusion
  - Flinch
  - Freeze
  - Paralysis
  - Poison/toxic
  - Sleep
- Natures
- EVs and IVs
- Accurate damage calculation
- Accurate damage orders

## Usage

```shell
cd apps/simulator
npm run start
```

## Example

```
========================================================

Charizard: 297/297 HEA [atk:0 def:0 spa:0 spd:0 spe:0 acc:0 eva:0 crt:0]
 - Ice Fang (15/15)

Blastoise: 299/299 HEA [atk:0 def:0 spa:0 spd:0 spe:0 acc:0 eva:0 crt:0]
 - Growl (40/40)

Charizard used Ice Fang on Blastoise
Blastoise was frozen!

Blastoise is frozen solid!

========================================================

Charizard: 297/297 HEA [atk:0 def:0 spa:0 spd:0 spe:0 acc:0 eva:0 crt:0]
 - Ice Fang (14/15)

Blastoise: 253/299 FRZ [atk:0 def:0 spa:0 spd:0 spe:0 acc:0 eva:0 crt:0]
 - Growl (40/40)

Charizard used Ice Fang on Blastoise

Blastoise thawed out!
Blastoise used Growl on Charizard
Charizard's attack fell!
```
