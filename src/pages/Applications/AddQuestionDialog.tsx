import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { saveQuestionMutation } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import SessionContext from "../../Context/SessionData/SessionContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}


function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function AddQuestionDialog() {
  const sessionData = useContext(SessionContext);
  
  const [question, setQuestion] = React.useState("");
  const [datatype, setDatatype] = React.useState("");
  const [roles, setRoles] = React.useState("");
  
  const navigate = useNavigate();


  const [createQuestion] = useMutation(saveQuestionMutation);

  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div style={{ margin: "10px", alignItems: "center" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Question
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add Question
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormControl sx={{ m: 1, minWidth: 500 }} size="small">
            <div style={{ minWidth: 400, display: "flex" }}></div>
            {/*  */}

            <div style={{ display: "grid", margin: 0 }}>
              <FormLabel id="question" sx={{ m: 1, minWidth: 300 }}>
                Question
              </FormLabel>
              <TextField
                name="question"
                sx={{ width: 300 }}
                onChange={(event: any) => setQuestion(event.target.value)}
                size="small"
              />
            </div>
            <div style={{ display: "grid", margin: 0 }}>
              <FormLabel id="selectDatatype" sx={{ m: 1, minWidth: 500 }}>
                Datatype
              </FormLabel>
              <Select
                id="selectDatatype"
                //   value={insuranceData}
                onChange={(event: any) => {
                  console.log("selectDatatype", event.target.value);
                  setDatatype(event.target.value);
                }}
                sx={{ width: 300 }}
                size="small"
              >
                <MenuItem value="string" key="string">
                  String
                </MenuItem>
                <MenuItem value="list" key="list">
                  List
                </MenuItem>
                <MenuItem value="bool" key="bool">
                  Boolean
                </MenuItem>
                <MenuItem value="date" key="date">
                  Date
                </MenuItem>
                <MenuItem value="float" key="float">
                  Float
                </MenuItem>
              </Select>
            </div>
            {/* </div> */}
            <div style={{ minWidth: 200, display: "flex" }}>
              <div style={{ display: "grid", margin: 0 }}>
                <FormLabel id="selectDatatype" sx={{ m: 1, minWidth: 300 }}>
                  Roles
                </FormLabel>
                <Select
                  id="roles_id"
                  value={roles}
                  variant="outlined"
                  onChange={(event: any) => {
                    console.log("Roles:-", event.target.value);
                    setRoles(event.target.value);
                  }}
                >
                  <MenuItem key="User" value="User">
                    Agent
                  </MenuItem>
                  <MenuItem key="Manager" value="Manager">
                    Admin
                  </MenuItem>
                  <MenuItem key="Appeaser" value="Appeaser">
                    Underwriter
                  </MenuItem>
                  {/* {Roles.map((data) => {
                return (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                );
              })} */}
                </Select>
              </div>
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={(event: any) => {
              event.preventDefault();
              //   console.log("section", section);
              console.log("dispaly Inoke");
              console.log("question:", question);
              createQuestion({
                variables: {
                  applicationUuid: "737a535e-ab6c-48ac-bcab-244c7cb59c06",
                  questionString: question,
                  // @ts-ignore
                  sectionUuid: sessionData?.sstate.uuid,
                  type: datatype,
                  role: roles,
                },
              });
              handleClose();
              navigate("/submissionQueue");
              // window.location.reload();
              handleClose();
            }}
          >
            Add
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
