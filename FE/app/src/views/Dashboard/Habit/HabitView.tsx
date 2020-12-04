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
import moment from "moment";
import { Grid } from "@material-ui/core";

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
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "white",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
      },
    },
    floatingLabelFocusStyle: {
      color: "white",
    },
    paper: {
      width: 400,
      height: 525,
      backgroundColor: "rgba(196, 196, 196, 1)",
    },
  })
);

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
  const [edit, setEdit] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [habits, setHabits] = React.useState<Habit[]>([]);
  //form
  const [title, setTitle] = React.useState("");
  const [coins, setCoins] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [taskType, setTaskType] = React.useState("");
  const [frequency, setFrequency] = React.useState<string[]>([]);
  const [duration, setDuration] = React.useState<string>();
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [habitId, setHabitId] = React.useState("");
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
      .get("https://habita-app.herokuapp.com/api/user/me", config)
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
      .get(`https://habita-app.herokuapp.com/api/habits/${userId}`)
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
  const handleEdit = (item: Habit) => {
    setHabitId(item._id);
    setEdit(true);
    setTitle(item.title);
    setCoins(item.coins);
    setDescription(item.description);
    setTaskType(item.taskType);
    setDuration(item.duration);
    setStartDate(new Date(item.startDate));
    setEndDate(new Date(item.endDate));
    setFrequency(item.frequency);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const getData = () => {
    if (searchText !== "") {
      return habits.filter((item) => item.title.includes(searchText));
    }
    return habits;
  };

  const handleDeleteHabit = async () => {
    console.log(habitId);
    const res = await axios
      .delete(`https://habita-app.herokuapp.com/api/habit/${habitId}`)
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
  };

  const handleEditHabit = async () => {
    if (
      title !== "" &&
      description !== "" &&
      taskType !== "" &&
      frequency.length > 0 &&
      duration !== ""
    ) {
      const res = await axios
        .put(`https://habita-app.herokuapp.com/api/habit/${habitId}`, {
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

  const handleAddHabit = async () => {
    if (
      title !== "" &&
      description !== "" &&
      taskType !== "" &&
      frequency.length > 0 &&
      duration !== ""
    ) {
      const res = await axios
        .post("https://habita-app.herokuapp.com/api/habit", {
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
            <Title>Tus habitos</Title>
            <TextFieldWrapper
              id="outlined-basic"
              label="Escribé para buscar"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={classes.root}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
            />
          </div>
          <Scrollbars style={{ height: 300 }}>
            {getData().length > 0
              ? getData().map((item, index) => {
                  return (
                    <div>
                      <Grid container>
                        <Grid item xs={12}>
                          <HabitItem
                            key={index}
                            title={item.title}
                            coins={item.coins}
                            _id={item._id}
                            status={item.status}
                            habit={item}
                            handleEdit={handleEdit}
                          />
                        </Grid>
                      </Grid>
                    </div>
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
                  <MenuItem value={"School"}>School</MenuItem>
                  <MenuItem value={"Fitness"}>Fitness</MenuItem>
                  <MenuItem value={"Personal"}>Personal</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
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

        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
          }}
          disableEnforceFocus={true}
          open={edit}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper} style={{ alignSelf: "center" }}>
            <TitleModal>Edit habit</TitleModal>
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
                  <MenuItem value={"School"}>School</MenuItem>
                  <MenuItem value={"Fitness"}>Fitness</MenuItem>
                  <MenuItem value={"Personal"}>Personal</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
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
                onClick={handleEditHabit}
              >
                Update
              </Button>
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
                onClick={handleDeleteHabit}
              >
                Delete
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
