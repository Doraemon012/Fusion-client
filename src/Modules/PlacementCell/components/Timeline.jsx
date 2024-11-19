import React, { useState, useEffect } from "react";
import { Timeline, Text, Card } from "@mantine/core";
import { Check, X, Minus } from "@phosphor-icons/react";
import axios from "axios";

function ApplicationStatusTimeline() {
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatusData() {
      const token = localStorage.getItem("authToken");
      const jobId = new URLSearchParams(window.location.search).get("jobId");

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/placement/api/timeline/${jobId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setStatusData(response.data.next_data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching application status data:", error);
        setLoading(false);
      }
    }

    fetchStatusData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ width: "500px" }}
      >
        <Text weight={700} size="xl" mb="md">
          Application Status
        </Text>

        {/* Timeline */}
        <Timeline active={statusData.length - 1} bulletSize={24} lineWidth={2}>
          {statusData.map((item, index) => {
            const isRejected = item.round_no === -1;
            const IsUpdated = item.round_no === 0;
            const isLast = index === statusData.length - 1;

            // Determine circle color
            const circleColor = isLast
              ? "gray"
              : isRejected
              ? "red"
              : "green";

            return (
              <Timeline.Item
                key={index}
                title={
                  isRejected
                    ? "Rejected"
                    :`${item.test_name} (Round ${item.round_no})`
                }
                bullet={
                  isLast ? (
                    <Minus size={12} />
                  ) : isRejected ? (
                    <X size={12} />
                  ) : (
                    <Check size={12} />
                  )
                }
                styles={{
                  bullet: {
                    backgroundColor: circleColor,
                    borderColor: circleColor,
                  }, 
                  title: {
                    color: isLast ? "gray" : isRejected ? "red" : "black",
                  },
                  body: {
                    color: isLast ? "gray" : isRejected ? "red" : "dimmed",
                  },
                }}
              >
                <Text size="sm">
                  { isRejected
                    ? "Application rejected"
                    : item.test_date
                    ? `Scheduled on ${item.test_date}`
                    : IsUpdated
                    ?"To be updated"
                    :"Completed"
                  }
                  {item.description && <div>{item.description}</div>}
                </Text>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Card>
    </div>
  );
}

export default ApplicationStatusTimeline;
