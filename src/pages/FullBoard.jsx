import React, { useEffect, useState } from "react";

import { Board } from "../components/Board";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumnsWithTasks } from "../redux/slices/columns";

export const FullBoard = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.boards);

  useEffect(() => {
    // TODO: keep the first line, delete the second
    // dispatch(fetchColumnsWithTasks(id));
    setTimeout(() => dispatch(fetchColumnsWithTasks(id)), 1000);
  }, []);

  return (
    <>
      <Board
        id={1}
        title="Roast the code #1 | Rock Paper Scissors"
        imageUrl=""
        user={{
          avatarUrl: "",
          fullName: "Keff",
        }}
        createdAt={"12 июня 2022 г."}
        viewsCount={150}
        commentsCount={3}
        tags={["react", "fun", "typescript"]}
        isFullPost
      >
        <p>
          Hey there! 👋 I'm starting a new series called "Roast the Code", where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can!!
        </p>
      </Board>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
