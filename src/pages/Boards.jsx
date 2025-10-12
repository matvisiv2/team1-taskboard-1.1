import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Board } from "../components/Board";
import { CommentsBlock } from "../components/CommentsBlock";
import { TagsBlock } from "../components/TagsBlock";
import { fetchBoardsWithStatistics } from "../redux/slices/boards";
import { Box, Stack } from "@mui/material";

export const Boards = () => {
  const user_id = 1;

  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.boards);

  const isBoardsLoading = boards.status === "loading";

  useEffect(() => {
    // TODO: keep the first line, delete the second
    // dispatch(fetchBoardsWithStatistics(user_id));
    setTimeout(() => dispatch(fetchBoardsWithStatistics(user_id)), 1000);
  }, []);

  return (
    <Box>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid
        container
        direction="row"
        spacing={4}
        wrap="nowrap"
        sx={{
          overflowX: "auto",
          flexWrap: "nowrap",
        }}
      >
        {(isBoardsLoading ? [...Array(5)] : boards.items).map((board, index) =>
          isBoardsLoading ? (
            <Grid key={`grid-board-${index}`} item sx={{ minWidth: 300 }}>
              <Board isLoading={true} />
            </Grid>
          ) : (
            <Grid key={`grid-board-${index}`} item sx={{ minWidth: 300 }}>
              <Board
                id={board.id}
                title={board.title}
                imageUrl=""
                user={{
                  avatarUrl: "",
                  fullName: `${board.first_name} ${board.last_name}`,
                }}
                createdAt={board.created_at}
                columnCount={board.column_count}
                taskCount={board.task_count}
                tags={["react", "fun", "typescript"]}
                isEditable
              />
            </Grid>
          ),
        )}
      </Grid>
    </Box>
  );
};
