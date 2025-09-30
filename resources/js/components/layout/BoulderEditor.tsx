import { Box, Button } from "@mui/material";
import BouldersViewer from "./BouldersViewer";
import FullScreenDialog from "../common/FullScreenDialog";
import { useToggle } from "../../customHooks/useToggle";
import PositionedSnackbar from "../common/Snackbar";
import BoulderFormRHF from "./BoulderFormRHF";
import LinearStepper from "../common/LinearStepper";

export default function BoulderEditor() {
  const [value, setToggle] = useToggle(false);
  return (
    <Box sx={{ "max-width": "1280px", margin: " 0 auto", minHeight: "84.3vh" }}>
      <Button variant="contained" size="large" onClick={setToggle}>
        Inserisci Boulder
      </Button>
      <FullScreenDialog
        setIsOpen={setToggle}
        isOpen={value}
        titleText="Boulder Form"
      >
        <LinearStepper />
      </FullScreenDialog>
      <BouldersViewer />
      <PositionedSnackbar />
    </Box>
  );
}
