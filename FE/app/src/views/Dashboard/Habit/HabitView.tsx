import React, { useEffect } from "react";
import styled from "styled-components";
import HabitItem from "./HabitItem";
import { Scrollbars } from "react-custom-scrollbars";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import axios from "axios";
import { Habit } from "../../Interfaces/interfaces";
import DatePicker from "react-datepicker";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import "react-datepicker/dist/react-datepicker.css";

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  height: 100vh;
`;

const HabitContainer = styled.div`
  background-color: rgba(196, 196, 196, 0.5);
  width: 80%;
  height: 500px;
  border-radius: 32px;
  align-self: center;
  padding: 16px;
`;

const Title = styled.h1`
  color: white;
  text-align: left;
`;
const TitleModal = styled.h1`
  color: white;
  text-align: center;
`;

const TextFieldWrapper = styled(TextField)`
  width: 300px;
  fieldset {
    border-radius: 50px;
  }
`;
const ContainerModal = styled.div`
  text-align: center;
`;

const DatePickerCustom = styled(DatePicker)`
  display: unset;
  width: 100%;
`;

const FrequencySquare = styled.div`
  height: 24px;
  width: 24px;
  background-color: red;
  margin: 5px;
`;

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
      height: 525,
      backgroundColor: "rgba(196, 196, 196, 1)",
    },
  })
);
const mockDataHabits = [
  { habitId: 1, title: "Habit 1", coins: 200 },
  { habitId: 2, title: "Habit 2", coins: 250 },
  { habitId: 2, title: "Habit 3", coins: 250 },
  { habitId: 1, title: "Habit 4", coins: 200 },
  { habitId: 2, title: "Habit 5", coins: 250 },
  { habitId: 2, title: "Habit 6", coins: 250 },
  { habitId: 1, title: "Habit 7", coins: 200 },
  { habitId: 2, title: "Habit 8", coins: 250 },
  { habitId: 2, title: "Habit 9", coins: 250 },
  { habitId: 1, title: "Habit 10", coins: 200 },
  { habitId: 2, title: "Habit 11", coins: 250 },
  { habitId: 2, title: "Habit 12", coins: 250 },
];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#35A8A4",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const frequencies = [
  "Monday",
  "Tuesday",
  "Wedensday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const HabitView = () => {
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [habits, setHabits] = React.useState<Habit[]>([]);
  //form
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [taskType, setTaskType] = React.useState("");
  const [frequency, setFrequency] = React.useState<string[]>([]);
  const [duration, setDuration] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const classes = useStyles();
  // alert
  const [openAlert, setOpenAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage
      .getItem("accessToken")!
      .replace(/['"]+/g, "");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get("http://localhost:8080/api/user/me", config)
      .then((response) => {
        getHabits(response.data._id);
        setUserId(response.data._id);
        setIsLoading(false);
      })
      .catch((e) => {
        // Capturamos los errores
      });
  }, []);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const getHabits = (userId: string) => {
    axios
      .get(`http://localhost:8080/api/habits/${userId}`)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTaskType(event.target.value as string);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFrequency(event.target.value as string[]);
  };

  const handleChangeMultiple = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFrequency(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = () => {
    if (searchText !== "") {
      return habits.filter((item) => item.title.includes(searchText));
    }
    return habits;
  };

  const handleAddHabit = async () => {
    if (
      title !== "" &&
      description !== "" &&
      taskType !== "" &&
      frequency.length > 0 &&
      duration !== ""
    ) {
      const res = await axios
        .post("http://localhost:8080/api/habit", {
          title,
          description,
          taskType,
          frequency: frequency,
          coins: 100,
          userId: userId,
          duration: duration,
          startDate,
          endDate,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            handleClose();
            window.location.reload();
          }
        })
        .catch((err) => {
          if (err.response.status === 404) console.log("Incorrect email");
          if (err.response.status === 400) console.log("Incorrect password");
        });
    } else {
      handleClickAlert();
    }
  };
  return (
    <MuiThemeProvider theme={theme}>
      <MainContainer>
        <HabitContainer>
          <div>
            <Title>Your habits</Title>
            <TextFieldWrapper
              id="outlined-basic"
              label="Type to search"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Scrollbars style={{ height: 300 }}>
            {getData().length > 0
              ? getData().map((item, index) => {
                  return (
                    <HabitItem
                      key={index}
                      title={item.title}
                      coins={item.coins}
                      _id={item._id}
                    />
                  );
                })
              : [
                  !isLoading && (
                    <p style={{ color: "white" }}>
                      No tienes actualmente habitos o no han sido encontrados.
                    </p>
                  ),
                ]}
          </Scrollbars>
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{
              marginTop: "20px",
              borderRadius: 35,
              backgroundColor: "red",
              padding: "14px 18px",
              fontSize: "14px",
              fontWeight: "bold",
              width: "150px",
              color: "#fff",
            }}
          >
            Add habit
          </Button>
        </HabitContainer>
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
            <TitleModal>Add habit</TitleModal>
            <ContainerModal>
              <TextFieldWrapper
                style={{ margin: 3 }}
                id="outlined-basic"
                label="Name of the habit"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextFieldWrapper
                style={{ margin: 3 }}
                id="outlined-basic"
                label="Description of habit"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextFieldWrapper
                style={{ margin: 3 }}
                id="outlined-basic"
                label="Duration"
                variant="outlined"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <FormControl>
                <Select
                  style={{ width: 300, textAlign: "left" }}
                  value={taskType}
                  onChange={handleChangeType}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Select type
                  </MenuItem>
                  <MenuItem value={"Mindfulness"}>Mindfulness</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-mutiple-name-label">Frequency</InputLabel>
                <Select
                  style={{ width: 300, textAlign: "left" }}
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={frequency}
                  onChange={handleChange}
                  input={<Input />}
                >
                  {frequencies.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div>
                <p style={{ margin: 0, padding: 0, textAlign: "center" }}>
                  Start date
                </p>
                <DatePickerCustom
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                />
                <p style={{ margin: 0, padding: 0, textAlign: "center" }}>
                  End date
                </p>
                <DatePickerCustom
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                />
              </div>

              <Button
                variant="contained"
                style={{
                  marginTop: "20px",
                  borderRadius: 35,
                  backgroundColor: "red",
                  padding: "14px 18px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "150px",
                  color: "#fff",
                }}
                onClick={handleAddHabit}
              >
                Add
              </Button>
            </ContainerModal>
          </div>
        </Modal>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            Por favor de ingresar los valores.
          </Alert>
        </Snackbar>
      </MainContainer>
    </MuiThemeProvider>
  );
};
export default HabitView;
