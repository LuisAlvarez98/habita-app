import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import HabitDone from "./HabitDone";
import { Habit, User } from "../Interfaces/interfaces";
import Modal from "@material-ui/core/Modal";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Scrollbars } from "react-custom-scrollbars";

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(50, 51, 63, 1);
`;

const Container = styled.div`
  background-color: rgba(196, 196, 196, 0.5);
  border-radius: 32px;
  height: auto;
  margin: 5px;
  padding: 15px;
  border-width: 2px;
  border-style: solid;
  border-color: black;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
`;

const LogoImage = styled.img`
  width: 25vw;
  height: 50vh;
`;

const Box = styled.div`
  width: 40vw;
  height: 30vh;
  background-color: rgba(67, 68, 74, 1);
  border-radius: 32px;
  height: auto;
  margin: 5px;
  padding: 15px;
  text-align: center;
`;

const ContainerModal = styled.div`
  text-align: center;
`;

const TextFieldWrapper = styled(TextField)`
  width: 300px;
  fieldset {
    border-radius: 50px;
  }
`;

const DatePickerCustom = styled(DatePicker)`
  display: unset;
  width: 100%;
`;

const mockDataHabits = [
  { habitId: 1, title: "Habit 1", coins: 200 },
  { habitId: 2, title: "Habit 2", coins: 250 },
];

const mockDataUser = {
  image: "https://www.abeautifulsite.net/uploads/2014/08/bit-face.png",
};
const Profile = () => {
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [habits, setHabits] = React.useState<Habit[]>([]);
  //form
  const [user, setUser] = useState<User>({
    coins: 0,
    experience: 0,
    fullName: "",
    hitpoints: 100,
    level: 1,
  });
  // Alert
  const [openAlert, setOpenAlert] = React.useState(false);

  useEffect(() => {
    me();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //this function gets the info of the user.
  const getUserInfo = (userId: string) => {
    axios
      .get(`https://habita-app.herokuapp.com/api/user/info/${userId}`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const me = async () => {
    if (localStorage.getItem("accessToken") !== null) {
      const accessToken = localStorage
        .getItem("accessToken")!
        .replace(/['"]+/g, "");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios
        .get("https://habita-app.herokuapp.com/api/user/me", config)
        .then((response) => {
          setUserId(response.data._id);
          getUserInfo(response.data._id);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const setFullName = (fullName: string) => {
    setUser({
      coins: user.coins,
      experience: user.experience,
      hitpoints: user.hitpoints,
      level: user.level,
      fullName: fullName,
      completedHabits: user.completedHabits,
      completedQuests: user.completedQuests,
    });
  };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleEditProfile = async () => {
    if (user.fullName !== "") {
      const res = await axios
        .put("https://habita-app.herokuapp.com/api/user/" + userId, {
          user,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            handleClose();
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) console.log("Incorrect email");
          if (err.response.status === 400) console.log("Incorrect password");
        });
    } else {
      setOpenAlert(true);
    }
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        "& > * + *": {
          marginTop: theme.spacing(2),
        },
      },
      paper: {
        width: 400,
        height: 250,
        backgroundColor: "rgba(196, 196, 196, 1)",
      },
    })
  );

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const classes = useStyles();
  return (
    <MainContainer>
      {console.log(user)}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Container>
            <Title>{user.fullName}</Title>
            <LogoImage src={mockDataUser.image}></LogoImage>
            <Button
              variant="contained"
              onClick={handleOpen}
              style={{
                marginTop: "20px",
                borderRadius: 35,
                backgroundColor: "rgba(250, 87, 65)",
                padding: "14px 18px",
                fontSize: "14px",
                fontWeight: "bold",
                width: "150px",
                color: "#fff",
              }}
            >
              Editar perfil
            </Button>
          </Container>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Container>
            <Title>Hábitos completados</Title>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Scrollbars style={{ height: 350 }}>
                {user.completedHabits &&
                  user.completedHabits.length > 0 &&
                  user.completedHabits.map((item, index) => {
                    return (
                      <HabitDone
                        key={index}
                        title={item.title}
                        coins={item.coins}
                      />
                    );
                  })}
              </Scrollbars>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Container>
            <Title>Quests completadas</Title>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Scrollbars style={{ height: 350 }}>
                {user.completedQuests &&
                  user.completedQuests.length > 0 &&
                  user.completedQuests.map((item, index) => {
                    return (
                      <HabitDone
                        key={index}
                        title={item.title}
                        coins={item.coins}
                      />
                    );
                  })}
              </Scrollbars>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
        }}
        disableEnforceFocus={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper} style={{ alignSelf: "center" }}>
          <Title>Editar perfil</Title>
          <ContainerModal>
            <TextFieldWrapper
              style={{ margin: 3 }}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              value={user.fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Button
              variant="contained"
              style={{
                marginTop: "20px",
                borderRadius: 35,
                backgroundColor: "rgba(250, 87, 65)",
                padding: "14px 18px",
                fontSize: "14px",
                fontWeight: "bold",
                width: "150px",
                color: "#fff",
              }}
              onClick={handleEditProfile}
            >
              Editar
            </Button>
            <Snackbar
              open={openAlert}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert onClose={handleCloseAlert} severity="error">
                Por favor ingres un nombre.
              </Alert>
            </Snackbar>
          </ContainerModal>
        </div>
      </Modal>
    </MainContainer>
  );
};
export default Profile;
