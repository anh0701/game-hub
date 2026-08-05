#

## Cấu trúc thư mục

| Thư mục      | Chức năng                                  |
| ------------ | ------------------------------------------ |
| `components` | Chỉ hiển thị giao diện                     |
| `game`       | Thuật toán Sudoku                          |
| `hooks`      | Logic game (React)                         |
| `models`     | Kiểu dữ liệu (TypeScript interfaces/types) |
| `pages`      | Ghép các component thành màn hình          |

## Luồng dữ liệu

```sh
useSudoku
      │
      │ sinh dữ liệu
      ▼
SudokuPage
      │
      │ truyền props
      ▼
SudokuBoard
      │
      │ truyền props
      ▼
SudokuCell
```

```sh
User Click ô (2,5)
    ↓
Ô được chọn
    ↓
Trên NumberPad
    ↓
User click 5
    ↓
onNumberClick(5)
    ↓
SudokuPage
    ↓
useSudoku.inputNumber(5)
```

## Quy tắc viết class Tailwind

```sh
  Layout
    ↓
  Size
    ↓
  Spacing
    ↓
  Border
    ↓
Background
    ↓
Typography
    ↓
  Effect
    ↓
Interaction
```
