import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MoreMenu } from "./../components/Menus/MoreMenu";

describe("MoreMenu", () => {
  test("calls handleRemove when Delete is clicked", async () => {
    const handleRemove = jest.fn();
    const setIsEditTitle = jest.fn();

    render(
      <MoreMenu handleRemove={handleRemove} setIsEditTitle={setIsEditTitle} />,
    );

    const menuButton = screen.getByRole("button", { id: /basic-button/i });
    fireEvent.click(menuButton);

    const deleteButton = await screen.findByText(/delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });
});
