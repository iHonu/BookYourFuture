import React from "react";
import { useRef, useEffect } from "react";
import { PhotoCamera } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";

export default function UploadWidget({ currentData, setCurrentData }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleDelete = () => {
    setCurrentData({ ...currentData, avatarUrl: "" });
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dxmq1hceo",
        uploadPreset: "zqigqx0q",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // Update the avatarUrl property in currentData state
          setCurrentData({ ...currentData, avatarUrl: result.info.secure_url });
        }
      }
    );
  }, [currentData, setCurrentData]);

  return (
    <>
      {currentData?.avatarUrl === "" || !currentData?.avatarUrl ? (
        <>
          <Avatar sx={{ width: 120, height: 120 }} />
          <Button
            onClick={() => widgetRef.current.open()}
            variant="contained"
            component="label"
            endIcon={<PhotoCamera />}
          >
            Upload Avatar
          </Button>
        </>
      ) : (
        <>
          <img
            src={currentData?.avatarUrl}
            alt="avatarUrl"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
          />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            mt={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => widgetRef.current.open()}
              variant="contained"
              component="label"
              endIcon={<PhotoCamera />}
            >
              Upload
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}

UploadWidget.propTypes = {
  currentData: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }),
  setCurrentData: PropTypes.func,
};
