import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoardCreateForm } from "../../components";
import { Board } from "../../components/Board";
import { fetchBoardsWithStatistics } from "../../redux/slices/boards";

export const Boards = () => {
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.boards);

  const isBoardsLoading = boards.status === "loading";

  useEffect(() => {
    // TODO: keep the first line, delete the second
    // dispatch(fetchBoardsWithStatistics());
    setTimeout(() => dispatch(fetchBoardsWithStatistics()), 1000);
  }, []);

  return (
    <Box>
      <Grid
        container
        direction="row"
        spacing={4}
        wrap="nowrap"
        sx={{
          overflowX: "auto",
          flexWrap: "nowrap",
          padding: "2px 2px 0 2px",
        }}
      >
        {(isBoardsLoading ? [...Array(3)] : boards.items).map((board, index) =>
          isBoardsLoading ? (
            <Grid key={`grid-board-${index}`} sx={{ minWidth: 300 }}>
              <Board isLoading={true} />
            </Grid>
          ) : (
            <Grid key={`grid-board-${index}`} sx={{ minWidth: 300 }}>
              <Board
                board={board}
                imageUrl=""
                user={{
                  avatarUrl: "",
                  fullName: `${board.firstName} ${board.lastName}`,
                }}
                isEditable
              />
            </Grid>
          ),
        )}
        <BoardCreateForm />
      </Grid>
    </Box>
  );
};
