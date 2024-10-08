import { Typography, Box } from "@mui/material";
import { tokens } from "@/theme";
interface HeaderProps {
    title: string;
    subtitle: string;
  }
const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const colors = tokens('dark');
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;