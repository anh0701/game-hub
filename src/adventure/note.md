```sh

                    ADVENTURE SYSTEM

                     AdventureManager
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
         startMap()                finishGame()
              │                         │
              ▼                         ▼
     MissionGenerator            MissionEvaluator
              │                         │
              ▼                         ▼
       Current Mission             SUCCESS/FAIL
              │                         │
              │                 ┌───────┴───────┐
              │                 ▼               ▼
              │              Rescue          Save Stats
              │                 │
              │                 ▼
              │            Unlock Map
              │
              ▼
            GAME
              │
              ▼
         GameResult

```

## Match 3

```sh

                    Match3
                      │
             ┌────────┴────────┐
             │                 │
            Free             Level
             │                 │
      không objective      Level data
             │                 │
             │          ┌──────┴──────┐
             │          │             │
             │        Timer        Objective
             │          │             │
             │          │        clear blocks
             │          │             │
             │          │       color optional
             │          │             │
             │          └──────┬──────┘
             │                 │
             │             Complete
             │                 │
             │             Next Level
             │
        No more moves
             │
          Game Over
```
