import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import styles from "./BoardHeader.module.scss";
import { AddCollaborator } from "../AddCollaborator";

export const BoardHeader = ({ board, loading }) => {
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return (
    <Container maxWidth="xl" className={styles.root}>
      <div className={styles.inner}>Board: {board?.title}</div>
      <div className={styles.inner}>
        <AvatarGroup max={4}>
          {board?.collaborators.map((collaborator) => (
            <Tooltip
              key={`key-${collaborator.id}`}
              title={`${collaborator.firstName} ${collaborator.lastName}`}
            >
              <Avatar
                alt={`${collaborator.firstName} ${collaborator.lastName}`}
                {...stringAvatar(
                  `${collaborator.firstName} ${collaborator.lastName}`,
                )}
                src="/static/images/avatar/1.jpg"
              />
            </Tooltip>
          ))}
        </AvatarGroup>
        <AddCollaborator />
      </div>
    </Container>
  );
};
