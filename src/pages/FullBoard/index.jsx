import React, { useEffect, useState } from "react";

import { Column } from "../../components/Column";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumnsWithTasks } from "../../redux/slices/columns";
import { Box, Grid } from "@mui/material";

export const FullBoard = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.columns);

  const isColumnsLoading = columns.status === "loading";

  useEffect(() => {
    // TODO: keep the first line, delete the second
    // dispatch(fetchColumnsWithTasks(id));
    setTimeout(() => dispatch(fetchColumnsWithTasks(id)), 1000);
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
      {(isColumnsLoading ? [...Array(5)] : columns.items).map(
        (column, index) =>
          isColumnsLoading ? (
            <Grid key={`grid-column-${index}`} sx={{ minWidth: 300 }}>
              <Column isLoading={true} />
            </Grid>
          ) : (
            <Grid key={`grid-column-${index}`} sx={{ minWidth: 300 }}>
              <Column
                id={column.id}
                title={column.title}
                tasks={column.tasks}
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
    </Grid>
  );
};
