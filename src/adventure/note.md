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
