import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SnackBar from "common/SnackBar";
import { showNavbar } from "features/snackbar.slice";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "services/apiUrl";
import axios from "axios";

export default function UserInfo() {
  const [identifiant, setIdentifiant] = React.useState();
  const [email, setEmail] = React.useState();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const getOneUserByToken = async () => {
    await axios
      .get(`${apiURL}/user/getOneUserByToken`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setIdentifiant(response.data.DATA.username);
        setEmail(response.data.DATA.email);
      })
      .catch((error) => {
        showNavbar({
          message: error.response.data.MESSAGE,
          type: "FAIL",
          open: true,
        });
      });
  };

  const updateUserInfo = async () => {
    await axios
      .put(
        `${apiURL}/user/editProfile`,
        {
          email,
          username: identifiant,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        dispatch(
          showNavbar({
            message: "Informations modifiée",
            type: "SUCCESS",
            open: true,
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNavbar({
            message: error.response.data.MESSAGE,
            type: "FAIL",
            open: true,
          })
        );
      });
  };

  const handleIdentifiantChange = (e) => {
    setIdentifiant(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    getOneUserByToken();
  }, []);

  const saveInfo = () => {
    updateUserInfo();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > :not(style)": { m: 1 },
        width: "100%",
      }}
    >
      <Typography variant="h5" mt={1}>
        Mes informations
      </Typography>
      <TextField
        label="Identifiant"
        value={identifiant}
        onChange={handleIdentifiantChange}
        defaultValue="identifiant"
        id="demo-helper-text-aligned-no-helper"
      />
      <TextField
        id="demo-helper-text-aligned-no-helper"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        defaultValue="Email"
      />
      <Stack direction="row" spacing={2}>
        <Button
          onClick={saveInfo}
          variant="contained"
          sx={{ background: "#b90837" }}
        >
          Enregistrer
        </Button>
      </Stack>
      {/* {open ? <SnackBar open={open} message={errorMessage} bg={snackBg} /> : ""} */}
    </Box>
  );
}
