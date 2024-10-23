import React, { useState } from "react";
import {
  TextInput,
  Button,
  Select,
  Group,
  Container,
  Modal,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

function AddPlacementRecordForm({ opened, onClose }) {
  const [companyName, setCompanyName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [ctc, setCtc] = useState("");
  const [year, setYear] = useState("");
  const [placementType, setPlacementType] = useState("");
  const [testType, setTestType] = useState("");
  const [testScore, setTestScore] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("placement_type", placementType);
    formData.append("company_name", companyName);
    formData.append("roll_no", rollNo);
    formData.append("ctc", ctc);
    formData.append("year", year);
    formData.append("test_type", testType);
    formData.append("test_score", testScore);

    try {
      const response = await fetch("http://127.0.0.1:8000/placement/api/statistics/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }

      const data = await response.json();
      console.log("Success:", data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error: " + error.message); // Display error message to the user
    }
  };

  return (
    <Container>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Add Placement Record"
        size="lg"
        centered
      >
        {/* Grouping input fields */}
        <Group grow spacing="md" direction="column" breakpoints={{ sm: { direction: "row" } }}>
          <TextInput
            label="Company Name"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <TextInput
            label="Roll No."
            placeholder="Enter roll number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </Group>

        <Group grow spacing="md" direction="column" breakpoints={{ sm: { direction: "row" } }} style={{ marginTop: "20px" }}>
          <TextInput
            label="CTC in LPA"
            placeholder="Enter CTC"
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            required
          />
          <TextInput
            label="Year"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </Group>

        <Select
          label="Placement Type"
          placeholder="Select placement type"
          data={["PBI", "Placement"]}
          value={placementType}
          onChange={setPlacementType}
          style={{ marginTop: "20px" }}
          required
        />

        <TextInput
          label="Test Type"
          placeholder="Enter test type"
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
          style={{ marginTop: "20px" }}
          required
        />

        <TextInput
          label="Test Score"
          placeholder="Enter test score"
          value={testScore}
          onChange={(e) => setTestScore(e.target.value)}
          style={{ marginTop: "20px" }}
          required
        />

        <Group position="right" style={{ marginTop: "20px" }}>
          <Button onClick={handleSubmit}>Add Record</Button>
        </Group>
      </Modal>
    </Container>
  );
}

export default AddPlacementRecordForm;
