# MVP

## Requirements

- post player creation? Only if basically done already. Otherwise just hardcode strings.
- post session creation (description, player names)
  - becomes new latest session. Can be done in Swagger just before game starts
- get session overview (everything known before actually starting, such as session plan and player mapping)
  - once per device, since this is static info
- post session and game id plus hand number, plus the hand status in any amount of completeness.
  - BE ultimately merges any incoming data in to the final result
  - No undo/clear. Once something is defined, it can't be cleared.
- get score report (all info from score sheet, for all or specified players)

## KISS

- Hardcode players and game structures
- current session comes from a config file or similar
- BE does not track "current status". UI has to track this and/or have the user do it.
- Don't do anything with rules
- tables are just strings, not entities

## Tech

DTO and PM layers. Don't save domain objects directly.

### Entities

- Player: name and optional color
- Session: player mapping, session plan
- Hand Report: (session id, game id, hand number), deep-partial hand result
- Score Report: (session id), map of game id to latest consolidated results

### Discoveries

- Codegen for INITIAL generation of api/db models from domain object
- collection utils
  - dictionary MapKeys and MapValues