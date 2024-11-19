import "@mantine/dates/styles.css";
import React, { useState } from "react";
import {
  Modal,
  Card,
  Title,
  Grid,
  TextInput,
  Select,
  Textarea,
  Group,
  Button,
} from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import { TimeInput } from "@mantine/dates";
import PropTypes from "prop-types";

const EditPlacementForm = ({ isOpen, onClose, placementData, onSubmit }) => {
  const {
    companyLogo,
    companyName,
    location,
    position,
    jobType,
    deadline,
    description,
    salary,
  } = placementData;

  // Initialize state
  const [company, setCompany] = useState(companyName);
  const [date, setDate] = useState(); // Initially null
  const [locationInput, setLocation] = useState(location);
  const [ctc, setCtc] = useState(salary);
  const [time, setTime] = useState(new Date());
  const [placementType, setPlacementType] = useState(jobType);
  const [descriptionInput, setDescription] = useState(description);
  const [role, setRole] = useState();

  const getFormattedDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  const handleSubmit = () => {
    // Ensure ctc is a valid number
    const parsedCtc = parseFloat(ctc);
    if (isNaN(parsedCtc) || parsedCtc <= 0) {
      alert("CTC must be a valid positive decimal number.");
      return;
    }

    // Format the CTC to two decimal places
    const formattedCtc = parsedCtc.toFixed(2);

    // Submit the form with all fields
    onSubmit({
      company,
      date: getFormattedDate(date),
      location: locationInput,
      ctc: formattedCtc,  // Use formatted CTC here
      time,
      placementType,
      description: descriptionInput,
      role,
    });
  };

  return (
    <Modal size="lg" centered opened={isOpen} onClose={onClose}>
      <Card>
        <Title order={3} align="center" style={{ marginBottom: "20px" }}>
          Edit Placement Event
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

          {/* Date Picker */}
          <Grid.Col span={4}>
           <DateInput
              label="Date"
              placeholder="Pick a date"
              value={date}
              onChange={(d) => {
                setDate(d);
                console.log(d, date);
              }}
              opened={datePickerOpened}
              onFocus={() => setDatePickerOpened(true)}
              onBlur={() => setDatePickerOpened(false)}
              styles={{
                input: {
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  padding: "10px",
                  fontSize: "14px",
                  width: "100%",
                  boxSizing: "border-box",
                  "&:focus": {
                    outline: "none",
                    borderColor: "#1c7ed6",
                  },
                },
                label: {
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#425047",
                },
              }}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              label="Location"
              placeholder="Enter location"
              value={locationInput}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              label="CTC In Lpa"
              placeholder="Enter CTC"
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
            />
          </Grid.Col>

          {/* Time Picker */}
          <Grid.Col span={4}>
            <TimeInput
              label="Time"
              placeholder="Select time"
              value={time}
              onChange={setTime}
              format="24"
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              label="Placement Type"
              placeholder="Select placement type"
              data={["Placement", "Internship"]}
              value={placementType}
              onChange={setPlacementType}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              resize="vertical"
              label="Description"
              placeholder="Enter a description"
              value={descriptionInput}
              onChange={(e) => setDescription(e.target.value)}
              minRows={3}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              label="Role Offered"
              placeholder="Enter the role offered"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" style={{ marginTop: "20px" }}>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </Group>
      </Card>
    </Modal>
  );
};

EditPlacementForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  placementData: PropTypes.shape({
    companyLogo: PropTypes.string,
    companyName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    description: PropTypes.string,
    salary: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditPlacementForm;
