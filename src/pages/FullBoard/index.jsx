import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Column } from "../../components/Column";
import { ColumnCreateForm } from "../../components/Forms/ColumnCreateForm";
import { fetchColumnsWithTasks } from "../../redux/slices/columns";

export const FullBoard = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.columns);

  const isColumnsLoading = columns.status === "loading";

  useEffect(() => {
    dispatch(fetchColumnsWithTasks(id));
  }, []);

  return (
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
      {(isColumnsLoading ? [...Array(5)] : columns.items).map((column, index) =>
        isColumnsLoading ? (
          <Grid key={`grid-column-${index}`} sx={{ minWidth: 300 }}>
            <Column isLoading={true} />
          </Grid>
        ) : (
          <Grid key={`grid-column-${index}`} sx={{ minWidth: 300 }}>
            <Column
              column={column}
              imageUrl=""
              user={{
                avatarUrl: "",
                fullName: `${column.firstName} ${column.lastName}`,
              }}
              createdAt={column.createdAt}
              tags={["react", "fun", "typescript"]}
              isEditable
            />
          </Grid>
        ),
      )}
      <ColumnCreateForm boardId={id}/>
    </Grid>
  );
};
