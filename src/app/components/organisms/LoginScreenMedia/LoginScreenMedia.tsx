import { CardMedia, Typography } from "@mui/material";

const LoginScreenMedia = () => {
  return (
    <CardMedia
      sx={{
        backgroundColor: `primary.main`,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
      }}
      image="/static/login-background.png"
    >
      <Typography sx={{ fontSize: "58px", fontWeight: "bold", color: "white" }}>
        A high-quality
      </Typography>
      <Typography sx={{ fontSize: "58px", fontWeight: "bold", color: "white" }}>
        solution.
      </Typography>
      <Typography sx={{ fontSize: "18px", marginTop: 4, color: "white" }}>
        Lorem ipsum dolor sit amet consectetur. Integer vel sed enim aliquet
        volutpat adipiscing ante amet. Aliquet volutpat ut magna lectus.
      </Typography>
    </CardMedia>
  );
};

export default LoginScreenMedia;
