import React, { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  TextInput,
  Select,
  Card,
  Title,
  Container,
  Button,
  Loader,
  Alert,
} from "@mantine/core";
import { statisticsRoute } from "../../../routes/placementCellRoutes"; 
import AddPlacementRecordForm from "./AddPlacementRecordForm";
import { useSelector } from "react-redux";

function PlacementRecordsTable() {
  const role = useSelector((state) => state.user.role);

  const [placementStats, setPlacementStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchPlacementStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(
          "http://127.0.0.1:8000/placement/api/statistics/",{
          headers:{
              'Authorization': `Token ${token}`,
          }
      });

        if (response.ok) {
          const data = await response.json();
          setPlacementStats(data);
        } else {
          setError(`Error fetching data: ${response.status}`);
        }
      } catch (error) {
        setError("Failed to fetch placement statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchPlacementStats();
  }, []);

  const paginatedRecords = placementStats.slice(
    (activePage - 1) * recordsPerPage,
    activePage * recordsPerPage,
  );

  const rows = paginatedRecords.map((record, index) => (
    <tr key={index}>
      <td style={{ padding: "4px", whiteSpace: "nowrap" }}>
        {record.first_name}
      </td>
      <td style={{ padding: "4px", whiteSpace: "nowrap" }}>
        {record.placement_name}
      </td>
      <td style={{ padding: "4px", whiteSpace: "nowrap" }}>{record.batch}</td>
      <td style={{ padding: "4px", whiteSpace: "nowrap" }}>{record.branch}</td>
      <td style={{ padding: "4px", whiteSpace: "nowrap" }}>{record.ctc}</td>
    </tr>
  ));

  if (loading) return <Loader />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <Container fluid>
      <Container
        fluid
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        my={16}
      >
        <Title order={2}>Placement Statisticts</Title>

        {role === "placement officer" && (
          <Button onClick={() => setModalOpened(true)}>
            Add Placement Record
          </Button>
        )}
      </Container>

      <Card
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
        style={{ width: "900px" }}
      >
        {/* Title */}
        <Title order={3} style={{ marginBottom: "12px", fontSize: "18px" }}>
          All Students
        </Title>

        {/* Table Search and Sorting Options */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "12px",
            gap: "8px",
          }}
        >
          <TextInput
            placeholder="Search"
            icon="🔍"
            style={{ width: "180px", fontSize: "14px" }}
          />
          <Select
            placeholder="Sort by"
            data={[
              { value: "newest", label: "Newest" },
              { value: "highest_ctc", label: "Highest CTC" },
              { value: "lowest_ctc", label: "Lowest CTC" },
            ]}
            style={{ width: "180px", fontSize: "14px" }}
          />
        </div>

        <Table
          highlightOnHover
          style={{
            tableLayout: "fixed",
            width: "100%",
            borderSpacing: "0px 0px",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Student Name</th>
              <th style={{ width: "30%" }}>Company</th>
              <th style={{ width: "12%" }}>Batch</th>
              <th style={{ width: "12%" }}>Branch</th>
              <th style={{ width: "12%" }}>CTC</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}
        >
          <Pagination
            total={Math.ceil(placementStats.length / recordsPerPage)}
            page={activePage}
            onChange={setActivePage}
          />
        </div>
      </Card>

      <AddPlacementRecordForm
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </Container>
  );
}

export default PlacementRecordsTable;

// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   MantineReactTable,
//   useMantineReactTable,
// } from 'mantine-react-table';
// import { Container, Title, Button, Loader, Alert, Pagination } from '@mantine/core';
// import { useSelector } from 'react-redux';
// import AddPlacementRecordForm from './AddPlacementRecordForm';

// function PlacementRecordsTable() {
//   const role = useSelector((state) => state.user.role);

//   // State to hold placement statistics from the API
//   const [placementStats, setPlacementStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modalOpened, setModalOpened] = useState(false);
//   const [activePage, setActivePage] = useState(1);
//   const recordsPerPage = 10;

//   // Fetch data from the API on component load
//   useEffect(() => {
//     const fetchPlacementStats = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('http://127.0.0.1:8000/placement/api/statistics/');
//         if (response.ok) {
//           const data = await response.json();
//           setPlacementStats(data);
//         } else {
//           setError(`Error fetching data: ${response.status}`);
//         }
//       } catch (error) {
//         setError('Failed to fetch placement statistics');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPlacementStats();
//   }, []);

//   // Define columns for MantineReactTable
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'first_name',
//         header: 'Student Name',
//         size: 200,
//       },
//       {
//         accessorKey: 'placement_name',
//         header: 'Company',
//         size: 200,
//       },
//       {
//         accessorKey: 'batch',
//         header: 'Batch',
//         size: 100,
//       },
//       {
//         accessorKey: 'branch',
//         header: 'Branch',
//         size: 100,
//       },
//       {
//         accessorKey: 'ctc',
//         header: 'CTC',
//         size: 100,
//       },
//     ],
//     []
//   );

//   // Paginate records for the table display
//   const paginatedRecords = placementStats.slice(
//     (activePage - 1) * recordsPerPage,
//     activePage * recordsPerPage
//   );

//   const table = useMantineReactTable({
//     columns,
//     data: paginatedRecords,
//     enableColumnOrdering: true,
//     enableGlobalFilter: true,
//   });

//   if (loading) return <Loader />;
//   if (error) return <Alert color="red">{error}</Alert>;

//   return (
//     <Container fluid>
//       <Container
//         fluid
//         style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
//         my={16}
//       >
//         <Title order={2}>Placement Statistics</Title>

//         {role === 'placement officer' && (
//           <Button onClick={() => setModalOpened(true)}>Add Placement Record</Button>
//         )}
//       </Container>

//       <MantineReactTable table={table} />

//       {/* Pagination */}
//       <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
//         <Pagination
//           total={Math.ceil(placementStats.length / recordsPerPage)}
//           page={activePage}
//           onChange={setActivePage}
//         />
//       </div>

//       <AddPlacementRecordForm opened={modalOpened} onClose={() => setModalOpened(false)} />
//     </Container>
//   );
// }

// export default PlacementRecordsTable;
