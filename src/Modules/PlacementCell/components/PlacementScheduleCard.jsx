import React, { useState } from "react";
import {
  Card,
  Text,
  Badge,
  Group,
  Button,
  Image,
  ActionIcon,
  Modal,
} from "@mantine/core";
import { MapPin, Trash, Pencil, Eye, Clock } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import EditPlacementForm from "./EditPlacementForm";

function PlacementScheduleCard({
  companyLogo,
  companyName,
  location,
  position,
  jobType,
  postedTime,
  description,
  salary,
}) {
  const role = useSelector((state) => state.user.role);
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleApplyClick = () => {
    console.log("Apply");
  };

  const handleEditSubmit = (updatedData) => {
    console.log("Updated Placement Data:", updatedData);
    // Save updated data logic here
  };

  const handelViewClick = () => {
    navigate(
      `/placement-cell/view?companyName=${encodeURIComponent(companyName)}&companyLogo=${encodeURIComponent(companyLogo)}`,
    );
  };

  const handleDeleteClick = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="lg" withBorder>
        <Group align="flex-start">
          <Image
            src={companyLogo}
            alt={`${companyName} logo`}
            width={40}
            height={40}
            fit="contain"
            withPlaceholder
          />
        </Group>
        <Text weight={700} size="lg" mt={10}>
          {companyName}
        </Text>
        <Group spacing={5} mt={5}>
          <MapPin size={16} />
          <Text size="sm" color="dimmed">
            {location}
          </Text>
        </Group>
        <Text weight={500} size="md" mt="sm">
          {position}
        </Text>
        <Group mt="xs" spacing="xs">
          <Badge color="green">{jobType}</Badge>
          <Group spacing={5}>
            <Clock size={16} />
            <Text size="xs" color="dimmed">
              {postedTime}
            </Text>
          </Group>
        </Group>
        <Text size="sm" mt="sm" color="dimmed" style={{ whiteSpace: "nowrap" }}>
          {description}
        </Text>
        <Group position="apart" mt="md">
          <Text size="xl" weight={700} color="blue">
            {salary}
          </Text>

          {role === "student" && (
            <Button
              variant="light"
              color="blue"
              size="xs"
              onClick={handleApplyClick}
            >
              Apply Now
            </Button>
          )}

          {role === "placement officer" && (
            <Group position="right" spacing="xs">
              <ActionIcon
                onClick={() => setIsModalOpen(true)}
                color="blue"
                size="md"
                variant="light"
              >
                <Pencil size={22} />
              </ActionIcon>

              <ActionIcon
                onClick={handelViewClick}
                color="blue"
                size="md"
                variant="light"
              >
                <Eye size={22} />
              </ActionIcon>

              <ActionIcon
                onClick={handleDeleteClick}
                color="red"
                size="md"
                variant="light"
              >
                <Trash size={22} />
              </ActionIcon>
            </Group>
          )}
        </Group>
      </Card>

      <Modal
        opened={isModalOpen}
        size="lg"
        onClose={() => setIsModalOpen(false)}
      >
        <EditPlacementForm
          initialValues={{
            companyName,
            location,
            position,
            jobType,
            description,
            salary,
          }}
          onSubmit={handleEditSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

PlacementScheduleCard.propTypes = {
  companyLogo: PropTypes.string,
  companyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  postedTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  salary: PropTypes.string,
};

export default PlacementScheduleCard;
