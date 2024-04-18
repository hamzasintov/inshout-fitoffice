import { Box, Typography } from "@mui/material";
import ContentCard from "../../atoms/ContentCard";
import TextInput from "../../atoms/TextInput";
import PrimaryButton from "../../atoms/PrimaryButton";

const PackageProcessingCard = () => {
  const handleSave = () => {
    console.log("save button is clicked");
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
      <TextInput label="Barcode Number" type="Number" fullWidth />
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
          backgroundColor="#007A35"
          handleOnClick={handleSave}
        />
      </Box>
    </ContentCard>
  );
};

export default PackageProcessingCard;
