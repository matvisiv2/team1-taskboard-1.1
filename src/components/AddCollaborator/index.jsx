import {
  Avatar,
  Button,
  CircularProgress,
  ClickAwayListener,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styles from "./AddCollaborator.module.scss";
import axios from "./../../axios";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/slices/snackbar";
import { fetchBoardAddCollaborator } from "../../redux/slices/currentBoard";

export const AddCollaborator = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const searchTimeout = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { data: currentBoard } = useSelector(
    (state) => state.currentBoard.board,
  );

  // Mock API request — replace with your API call
  const fetchUsers = async (text) => {
    if (!text) return [];
    setLoading(true);
    let data = [];
    try {
      data = await axios.get(
        `/users-to-collaborate/${currentBoard.id}/${text}`,
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Failed to get collaborators",
          success: false,
        }),
      );
    } finally {
      setLoading(false);
      return data.data;
    }
  };

  // Debounced search
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!query.trim()) {
      setResults([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      const res = await fetchUsers(query);
      setResults(res);
    }, 400); // debounce delay

    return () => clearTimeout(searchTimeout.current);
  }, [query]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setSelectedUser(null);
  };

  const confirmSelect = async () => {
    if (!selectedUser) return;
    const data = await dispatch(
      fetchBoardAddCollaborator({
        boardId: currentBoard.id,
        user: selectedUser,
      }),
    );

    if (data.error) {
      dispatch(
        showSnackbar({ message: "Failed to add collaborator", success: false }),
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Collaborator added successfully",
          success: true,
        }),
      );
    }

    handleClose();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="relative" ref={containerRef}>
        <Avatar
          onClick={handleOpen}
          sx={{
            cursor: "pointer",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          +
        </Avatar>

        {open && (
          <Paper
            elevation={6}
            sx={{
              position: "absolute",
              right: 0,
              mt: 1,
              width: 280,
              p: 2,
              borderRadius: 3,
              zIndex: 100,
            }}
          >
            <TextField
              fullWidth
              size="small"
              label="Search users"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {loading ? (
              <div className={styles["loading-container"]}>
                <CircularProgress size={24} />
              </div>
            ) : (
              <List>
                {results?.map((user) => (
                  <ListItem
                    button="button"
                    key={user.id}
                    selected={selectedUser?.id === user.id}
                    onClick={() => setSelectedUser(user)}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                    />
                  </ListItem>
                ))}

                {!loading && results?.length === 0 && query && (
                  <div
                    className="text-center p-2 text-sm"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    No users found
                  </div>
                )}
              </List>
            )}

            <Button
              variant="contained"
              fullWidth
              disabled={!selectedUser}
              sx={{ mt: 1, borderRadius: 2 }}
              onClick={confirmSelect}
            >
              Add collaborator
            </Button>
          </Paper>
        )}
      </div>
    </ClickAwayListener>
  );
};
