#

## Luong

```sh
RiseUpPage
        │
        ▼
Game State
        │
        ├── balloon
        ├── shield
        ├── obstacles
        └── score
```

```sh
RiseUpPage.tsx
       │
       ↓
 updateGame.ts
       │
       ├── Camera
       ├── Zone generation
       ├── Shield movement
       │
       ├── ObstacleSystem
       │      ├── obstacle movement
       │      ├── wall collision
       │      └── shield collision
       │
       ├── Balloon collision
       ├── Score
       └── Game Over
```
