import { Button } from "@mui/material";
import Image from "next/image";

import editIcon from "../../../../../public/editIcon.svg";
import { FC } from "react";

interface EditButtonProps {
  handleOnClick: () => void;
}

const EditButton: FC<EditButtonProps> = ({ handleOnClick }) => {
  return (
    <Button
      onClick={handleOnClick}
      variant="contained"
      sx={{
        backgroundColor: "#007A35 !important",
        margin: "16px",
        height: "40px",
      }}
    >
      <Image src={editIcon} width={16} alt="edit-icon" />
    </Button>
  );
};

export default EditButton;
