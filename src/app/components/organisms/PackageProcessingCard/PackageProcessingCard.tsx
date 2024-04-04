import { Box, Typography } from "@mui/material";
import ContentCard from "../../atoms/ContentCard";
import TextInput from "../../atoms/TextInput";
import PrimaryButton from "../../atoms/PrimaryButton";
import { useDispatch } from "react-redux";
import { addPackage } from "@/app/features/dashboard/packageSlice";
import { useState } from "react";

const PackageProcessingCard = () => {
  const dispatch = useDispatch();

  const [barcode, setBarcode] = useState("");

  const handleSave = () => {
    dispatch(addPackage({ barcode: barcode }));
    console.log("save button is clicked", barcode);
  };
  return (
    <ContentCard height={200}>
      <Typography
        sx={{
          fontWeight: "medium",
          fontSize: "12px",
          marginBottom: "8px",
        }}
      >
        PACKAGE PROCESSING
      </Typography>
      <TextInput
        label="Barcode Number"
        type="Number"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        fullWidth
      />
      <Box
        sx={{
          display: "flex",
          marginTop: "16px",
          justifyContent: "flex-end",
        }}
      >
        <PrimaryButton
          label="Save"
          variant="contained"
          backgroundColor="#2C3680"
          textColor="white"
          handleOnClick={handleSave}
          disabled={false}
        />
      </Box>
    </ContentCard>
  );
};

export default PackageProcessingCard;
