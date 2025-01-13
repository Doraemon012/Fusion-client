// import React, { useState, useEffect } from "react";
// import {
//   TextInput,
//   Button,
//   Group,
//   Select,
//   Textarea,
//   Card,
//   Title,
//   Grid,
//   ActionIcon,
// } from "@mantine/core";
// import { DatePicker, TimeInput } from "@mantine/dates";
// import { Calendar } from "@phosphor-icons/react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { notifications } from "@mantine/notifications";

// function AddPlacementEventForm() {
//   const role = useSelector((state) => state.user.role);
//   const [company, setCompany] = useState("");
//   const [date, setDate] = useState(null);
//   const [location, setLocation] = useState("");
//   const [ctc, setCtc] = useState("");
//   const [time, setTime] = useState(""); // Time as string
//   const [placementType, setPlacementType] = useState("");
//   const [description, setDescription] = useState("");
//   const [jobrole, setRole] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [datePickerOpened, setDatePickerOpened] = useState(false);

//   const getCurrentTime = () => {
//     const now = new Date();
//     return now.toLocaleTimeString("en-GB", { hour12: false });
//   };

//   useEffect(() => {
//     setTime(getCurrentTime());
//   }, []);

//   const handleSubmit = async () => {
//     console.log("Submitting form");

//     const token = localStorage.getItem("authToken"); 
//     if (!token) {
//       notifications.show({
//         title: "Unauthorized",
//         message: "You must log in to perform this action.",
//         color: "red",
//         position: "top-center",
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("placement_type", placementType);
//     formData.append("company_name", company);
//     formData.append("ctc", ctc);
//     formData.append("description", description);
//     formData.append("title", company);
//     formData.append("location", location);
//     formData.append("role", role);

//     if (resumeFile) {
//       formData.append("resume", resumeFile);
//     }

//     formData.append("schedule_at", time);

//     if (date) {
//       formData.append("placement_date", date.toISOString().split("T")[0]);
//     }

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/placement/api/placement/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: ``Token ${token}``, 
//         },
//       });
//       alert(response.data.message);
//       notifications.show({
//         title: "Event Added",
//         message: "Placement Event has been added successfully.",
//         color: "green",
//         position: "top-center",
//       });
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || error.message;
//       notifications.show({
//         title: "Error",
//         message: `Failed to add Placement Event: ${errorMessage}`,
//         color: "red",
//         position: "top-center",
//       });
//       console.error(
//         "Error adding schedule:",
//         error.response?.data?.error || error.message,
//       );
//     }
//   };

//   return (
//     <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
//       <Title order={3} align="center" style={{ marginBottom: "20px" }}>
//         Add Placement Event
//       </Title>

//       <Grid gutter="lg">
//         <Grid.Col span={4}>
//           <TextInput
//             label="Company Name"
//             placeholder="Enter company name"
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//           />
//         </Grid.Col>
//         <Grid.Col span={4} style={{ position: "relative" }}>
//           <TextInput
//             label="Date (yyyy-mm-dd)"
//             placeholder="Pick date"
//             value={date ? date.toLocaleDateString() : ""}
//             readOnly
//             rightSection={
//               <ActionIcon onClick={() => setDatePickerOpened((prev) => !prev)}>
//                 <Calendar size={16} />
//               </ActionIcon>
//             }
//           />
//           {datePickerOpened && (
//             <DatePicker
//               value={date}
//               onChange={(selectedDate) => {
//                 setDate(selectedDate);
//                 setDatePickerOpened(false);
//               }}
//               onBlur={() => setDatePickerOpened(false)}
//               style={{ zIndex: 1 }}
//             />
//           )}
//         </Grid.Col>
//         <Grid.Col span={4}>
//           <TextInput
//             label="Location"
//             placeholder="Enter location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </Grid.Col>

//         <Grid.Col span={4}>
//           <TextInput
//             label="CTC In Lpa"
//             placeholder="Enter CTC"
//             value={ctc}
//             onChange={(e) => setCtc(e.target.value)}
//           />
//         </Grid.Col>
//         <Grid.Col span={4}>
//           <TimeInput
//             label="Time"
//             placeholder="Select time"
//             value={time}
//             onChange={(value) =>
//               setTime(value.toLocaleTimeString("en-GB", { hour12: false }))
//             }
//             format="24"
//           />
//         </Grid.Col>
//         <Grid.Col span={4}>
//           <Select
//             label="Placement Type"
//             placeholder="Select placement type"
//             data={["Placement", "Internship"]}
//             value={placementType}
//             onChange={setPlacementType}
//           />
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <Textarea
//             label="Description"
//             placeholder="Enter a description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             minRows={3}
//           />
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <TextInput
//             label="Role Offered"
//             placeholder="Enter the role offered"
//             value={jobrole}
//             onChange={(e) => setRole(e.target.value)}
//           />
//         </Grid.Col>

//         {role === "student" && (
//           <Grid.Col span={12}>
//             <TextInput
//               label="Resume"
//               type="file"
//               onChange={(e) => setResumeFile(e.target.files[0])}
//             />
//           </Grid.Col>
//         )}
//       </Grid>

//       <Group position="right" style={{ marginTop: "20px" }}>
//         <Button onClick={handleSubmit}>Add Event</Button>
//       </Group>
//     </Card>
//   );
// }

// export default AddPlacementEventForm;


import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  Select,
  Textarea,
  Card,
  Title,
  Grid,
  ActionIcon,
  Chip,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { Calendar } from "@phosphor-icons/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { addPlacementEventForm } from "../../../routes/placementCellRoutes";

function AddPlacementEventForm() {
  const role = useSelector((state) => state.user.role);
  const [company, setCompany] = useState("");
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState("");
  const [ctc, setCtc] = useState("");
  const [time, setTime] = useState("");
  const [endDateTime, setEndDateTime] = useState(""); // Separate variable for end time
  const [placementType, setPlacementType] = useState("");
  const [description, setDescription] = useState("");
  const [jobrole, setRole] = useState("");
  // const [resumeFile, setResumeFile] = useState(null);
  const [eligibility, setEligibility] = useState([]);
  // const [eligibilityInput, setEligibilityInput] = useState("");
  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const [endDatePickerOpened, setEndDatePickerOpened] = useState(false);

  // State to handle new eligibility form fields
  const [passoutYear, setPassoutYear] = useState("");
  const [gender, setGender] = useState("");
  const [cpi, setCpi] = useState("");
  const [branch, setBranch] = useState("");

  const [showPassoutYearInput, setShowPassoutYearInput] = useState(false);
  const [showGenderSelect, setShowGenderSelect] = useState(false);
  const [showCpiInput, setShowCpiInput] = useState(false);
  const [showBranchSelect, setShowBranchSelect] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", { hour12: false });
  };

  useEffect(() => {
    setTime(getCurrentTime());
  }, []);

  const handleSubmit = async () => {
    console.log("Submitting form");

    const token = localStorage.getItem("authToken");
    if (!token) {
      notifications.show({
        title: "Unauthorized",
        message: "You must log in to perform this action.",
        color: "red",
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();
    formData.append("placement_type", placementType);
    formData.append("company_name", company);
    formData.append("ctc", ctc);
    formData.append("description", description);
    formData.append("title", company);
    formData.append("location", location);
    formData.append("role", jobrole);
    formData.append("eligibility", eligibility.join(", "));

    // if (resumeFile) {
    //   formData.append("resume", resumeFile);
    // }

    formData.append("schedule_at", time);

    if (date) {
      formData.append("placement_date", date.toISOString().split("T")[0]);
    }

    if (endDate) {
      formData.append("end_date", endDate.toISOString().split("T")[0]);
    }

    if (endDateTime) {
      formData.append("end_datetime", endDateTime);
    }

    if (endDate) {
      formData.append("end_date", endDate.toISOString().split("T")[0]);
    }

    if (endDateTime) {
      formData.append("end_datetime", endDateTime);
    }

    try {
      const response = await axios.post(addPlacementEventForm, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`, 
        },
      });
      // alert(response.data.message);
      // Notification for success
      notifications.show({
        title: "Event Added",
        message: "Placement Event has been added successfully.",
        color: "green",
        position: "top-center",
      });
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      notifications.show({
        title: "Error",
        message: `Failed to add Placement Event: ${errorMessage}`,
        color: "red",
        position: "top-center",
      });
      console.error(
        "Error adding schedule:",
        error.response?.data?.error || error.message,
      );
    }
  };

  // const handleAddEligibility = () => {
  //   if (eligibilityInput.trim()) {
  //     setEligibility([...eligibility, eligibilityInput.trim()]);
  //     setEligibilityInput("");
  //   }
  // };

  return (
    <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Title order={3} align="center" style={{ marginBottom: "20px" }}>
        Add Placement Event
      </Title>

      <Grid gutter="lg">
        <Grid.Col span={4}>
          <TextInput
            label="Company Name"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Grid.Col>

        {/* Date of Drive */}
        <Grid.Col span={4} style={{ position: "relative" }}>
          <TextInput
            label="Date of Drive"
            placeholder="Pick date"
            value={date ? date.toLocaleDateString() : ""}
            readOnly
            rightSection={
              <ActionIcon onClick={() => setDatePickerOpened((prev) => !prev)}>
                <Calendar size={16} />
              </ActionIcon>
            }
          />
          {datePickerOpened && (
            <DatePicker
              value={date}
              onChange={(selectedDate) => {
                setDate(selectedDate);
                setDatePickerOpened(false);
              }}
              onBlur={() => setDatePickerOpened(false)}
              style={{ zIndex: 1 }}
            />
          )}
        </Grid.Col>

        {/* End Date */}
        <Grid.Col span={4} style={{ position: "relative" }}>
          <TextInput
            label="End Date"
            placeholder="Pick end date"
            value={endDate ? endDate.toLocaleDateString() : ""}
            readOnly
            rightSection={
              <ActionIcon
                onClick={() => setEndDatePickerOpened((prev) => !prev)}
              >
                <Calendar size={16} />
              </ActionIcon>
            }
          />
          {endDatePickerOpened && (
            <DatePicker
              value={endDate}
              onChange={(selectedDate) => {
                setEndDate(selectedDate);
                setEndDatePickerOpened(false);
              }}
              onBlur={() => setEndDatePickerOpened(false)}
              style={{ zIndex: 1 }}
            />
          )}
        </Grid.Col>

        {/* Location */}
        <Grid.Col span={4}>
          <TextInput
            label="Location"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid.Col>

        {/* CTC */}
        <Grid.Col span={4}>
          <TextInput
            label="CTC In Lpa"
            placeholder="Enter CTC"
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
          />
        </Grid.Col>

        {/* Start Time */}
        <Grid.Col span={4}>
          <TimeInput
            label="Start Time"
            placeholder="Select time"
            value={time ? new Date(`1970-01-01T${time}:00`) : null}
            onChange={(value) => {
              if (value instanceof Date && !Number.isNaN(value)) {
                setTime(value.toTimeString().slice(0, 5));
              }
            }}
            format="24"
          />
        </Grid.Col>

        {/* End Time */}
        <Grid.Col span={4}>
          <TimeInput
            label="End Time"
            placeholder="Select end time"
            value={
              endDateTime ? new Date(`1970-01-01T${endDateTime}:00`) : null
            }
            onChange={(value) => {
              if (value instanceof Date && !Number.isNaN(value)) {
                setEndDateTime(value.toTimeString().slice(0, 5)); // Store as HH:mm
              }
            }}
            format="24"
          />
        </Grid.Col>

        {/* Placement Type */}
        <Grid.Col span={4}>
          <Select
            label="Placement Type"
            placeholder="Select placement type"
            data={["Placement", "Internship"]}
            value={placementType}
            onChange={setPlacementType}
          />
        </Grid.Col>

        {/* Description */}
        <Grid.Col span={12}>
          <Textarea
            label="Description"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
          />
        </Grid.Col>

        {/* Role Offered */}
        <Grid.Col span={12}>
          <TextInput
            label="Role Offered"
            placeholder="Enter the role offered"
            value={jobrole}
            onChange={(e) => setRole(e.target.value)}
          />
        </Grid.Col>

        {/* Eligibility Criteria */}
        <Grid.Col span={12}>
          <b>Eligibility Criteria</b>
          {/* <TextInput
            //label="Eligibility Criteria"
            // placeholder="Enter eligibility criteria"
            // value={eligibilityInput}
            // onChange={(e) => setEligibilityInput(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     e.preventDefault();
            //     handleAddEligibility();
            //   }
            // }}
          /> */}
          <Chip.Group
            multiple
            value={eligibility}
            onChange={setEligibility}
            style={{ marginTop: "10px" }}
          >
            {eligibility.map((criteria, index) => (
              <Chip key={index} value={criteria}>
                {criteria}
              </Chip>
            ))}
          </Chip.Group>
        </Grid.Col>

        {/* Eligibility Buttons */}
        <Grid.Col span={12}>
          <Group direction="column" spacing="xs">
            <Button
              onClick={() => setShowPassoutYearInput(!showPassoutYearInput)}
            >
              Passout Year
            </Button>
            {showPassoutYearInput && (
              <TextInput
                placeholder="Enter Passout Year"
                value={passoutYear}
                onChange={(e) => setPassoutYear(e.target.value)}
              />
            )}

            <Button onClick={() => setShowGenderSelect(!showGenderSelect)}>
              Gender
            </Button>
            {showGenderSelect && (
              <Select
                value={gender}
                onChange={setGender}
                data={["Male", "Female"]}
                placeholder="Select Gender"
              />
            )}

            <Button onClick={() => setShowCpiInput(!showCpiInput)}>CPI</Button>
            {showCpiInput && (
              <TextInput
                placeholder="Enter CPI"
                value={cpi}
                onChange={(e) => setCpi(e.target.value)}
              />
            )}

            <Button onClick={() => setShowBranchSelect(!showBranchSelect)}>
              Branch
            </Button>
            {showBranchSelect && (
              <Select
                value={branch}
                onChange={setBranch}
                data={["CSE", "ECE", "MECH", "SM", "BDES"]}
                placeholder="Select Branch"
              />
            )}
          </Group>
        </Grid.Col>

        <Grid.Col span={12}>
          <Button onClick={handleSubmit} fullWidth>
            Submit
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
}

export default AddPlacementEventForm;