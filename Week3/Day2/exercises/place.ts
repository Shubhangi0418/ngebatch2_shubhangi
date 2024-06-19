export function place(board: any, player: any, column: any) {
  for (let i = 0; i < board[column].length; i++) {
    if (!board[column][i]) {
      board[column][i] = player
      return board
    }
  }
}
