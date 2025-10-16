import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import styles from "./Column.module.scss";

export const ColumnSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Stack spacing={1}>
        <div className={styles.skeletonContent}>
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={80} height={15} />
          <Skeleton variant="text" width={85} height={15} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={90} height={15} />
        </div>
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Stack>
    </div>
  );
};
