import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
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

const FrequencySquare = styled.div`
  height: 24px;
  width: 24px;
  background-color: red;
  margin: 5px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 400,
      height: 500,
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

  const classes = useStyles();

  useEffect(() => {
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
      })
      .catch((e) => {
        // Capturamos los errores
      });
  }, []);

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
    const res = await axios
      .post("http://localhost:8080/api/habit", {
        title,
        description,
        taskType,
        frequency: frequency,
        coins: 100,
        userId: userId,
        duration: duration,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) console.log("Incorrect email");
        if (err.response.status === 400) console.log("Incorrect password");
      });
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
            {getData().map((item, index) => {
              return (
                <HabitItem key={index} title={item.title} coins={item.coins} />
              );
            })}
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
      </MainContainer>
    </MuiThemeProvider>
  );
};
export default HabitView;
