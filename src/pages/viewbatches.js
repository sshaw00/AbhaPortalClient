import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import Layout from "../components/layout";
import DashLayout from "../components/dashlayout";
import { unauthenticateUser } from "../redux/slices/authSlice";
import "./dash.css";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
axios.defaults.withCredentials = true;

const ViewBatches = () => {
  const [centre, setCentre] = React.useState("");
  const [batch, setBatch] = React.useState("");
  const [batchOptions, setBatchOptions] = React.useState([]);

  const handleChangeCentre = async (event) => {
    setCentre(event.target.value);
    const { data } = await axios.post(
      "http://localhost:8000/api/get-batches",
      centre
    );
    console.log(data);
    // Reset batch selection when centre changes
    setBatch("");
    // Set batch options based on selected centre
    switch (event.target.value) {
      case "Pathar Pratima ITI":
        setBatchOptions(["MPower Batch 1", "MPower Batch 2", "MPower Batch 3"]);
        break;
      case "Shishu Udhyan Nursery & KG School":
        setBatchOptions(["NRich Level 1", "NRich Level 2"]);
        break;
      case "Dinabandhu Andrews College":
        setBatchOptions(["MPower Batch 1", "MPower Batch 2"]);
        break;
      default:
        setBatchOptions([]);
    }
  };
  const handleChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(true);

  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);

      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  const handleSubmit = () => {
    // Send the selected centre and batch values to your API
    console.log("Selected Centre:", centre);
    console.log("Selected Batch:", batch);
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <DashLayout>
      <h1>Loading...</h1>
    </DashLayout>
  ) : (
    <div>
      <DashLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            border: "1px solid #ccc",
            padding: "16px",
            justifyContent: "center",
            width: "100%", // Set width to 100% to spread across the full width of the page
            maxWidth: "90vw", // Set max width to 90% of viewport width
            margin: "0 9vw 0 9vw", // Center the form horizontally
          }}
        >
          <FormControl fullWidth sx={{ width: "100%" }}>
            <InputLabel id="demo-centre-select-label">Centre</InputLabel>
            <Select
              labelId="demo-centre-select-label"
              id="demo-centre-select"
              value={centre}
              label="Centre"
              onChange={handleChangeCentre}
            >
              <MenuItem value={"Pathar Pratima ITI"}>
                Pathar Pratima ITI
              </MenuItem>
              <MenuItem value={"Shishu Udhyan Nursery & KG School"}>
                Shishu Udhyan Nursery & KG School
              </MenuItem>
              <MenuItem value={"Dinabandhu Andrews College"}>
                Dinabandhu Andrews College
              </MenuItem>
            </Select>
          </FormControl>

          {batchOptions.length > 0 && (
            <FormControl fullWidth sx={{ width: "100%" }}>
              <InputLabel id="demo-batch-select-label">Batch</InputLabel>
              <Select
                labelId="demo-batch-select-label"
                id="demo-batch-select"
                value={batch}
                label="Batch"
                onChange={handleChangeBatch}
              >
                {batchOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!centre || !batch}
            sx={{ width: "100%" }}
          >
            Submit
          </Button> */}
        </Box>
      </DashLayout>
    </div>
  );
};

export default ViewBatches;
