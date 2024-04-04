import Image from "next/image";
import { Box, Typography } from "@mui/material";
import bellIcon from "../../../../../public/bellIcon.svg";
import profilePic from "../../../../../public/profile-pic.jpg";
import { FC } from "react";

interface ProfileOptionsProps {
  userName: string;
  userProfile?: string;
}

const ProfileOptions: FC<ProfileOptionsProps> = ({ userName, userProfile }) => {
  const handleNotifications = () => {
    console.log("bell icon is clicked");
  };

  const handleUserProfile = () => {
    console.log("user name is clicked");
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        onClick={handleNotifications}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <Image src={bellIcon} width={16} height={18} alt="bell-icon" />
      </Box>
      <Box
        sx={{
          borderLeft: "1px solid white",
          height: "40px",
          marginLeft: "28px",
          marginRight: "28px",
        }}
      ></Box>
      <Box
        onClick={handleUserProfile}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "white" }}>
          {userName}
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid white",
          padding: "1px",
          borderRadius: "100%",
          overflow: "hidden",
          height: "40px",
          width: "40px",
          marginLeft: "28px",
          marginRight: "16px",
        }}
      >
        <Image src={profilePic} width={60} height={60} alt="bell-icon" />
      </Box>
    </Box>
  );
};

export default ProfileOptions;
