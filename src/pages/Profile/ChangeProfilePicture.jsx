import React, { useState, useEffect, createRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CustomDialog } from "lib";
import { Button, TextField, Avatar } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { uploadSingleFile } from "utils/functions";
import { toast } from "react-toastify";
import { FileUploadWrapper } from "lib";
import { UsersAPI } from "api_inbusiness";
import DefaultUserPicture from "resources/img/user/DefaultUserPicture.png";
import styles from "./Profile.module.scss";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

const ChangeProfilePicture = ({
  open,
  setOpen,
  userData,
  getUserById,
  userPhoto,
}) => {
  const { t } = useTranslation();
  const [fileBlob, setFileBlob] = useState(null);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const cropperRef = useRef();

  const onSubmitFunc = () => {
    const data = handleCrop();
    UsersAPI.updatePicture(userData.id, data).then((res) => {
      if (res.ok === true) {
        getUserById();
        setOpen(false);
        setName("");
        setImage(null);
        toast.success("Poza de profil a fost actualizată cu succes!");
      } else {
        toast.error("A intervenit o eroare!");
      }
    });
  };

  const getCropData = () => {
    if (cropperRef && cropperRef.current !== undefined) {
      setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      toast.success("Imaginea a fost decupată cu succes!");
    }
  };

  const handleCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;

    //image from cropper
    let base64Data = cropper.getCroppedCanvas().toDataURL();

    // Get the content type and data
    let contentType = base64Data.split(";")[0].split(":")[1];
    let raw = window.atob(base64Data.split(",")[1]);

    // Create a Uint8Array from the base64 raw data
    let uint8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; ++i) {
      uint8Array[i] = raw.charCodeAt(i);
    }
    // const blob = dataURItoBlob(cropper.getCroppedCanvas().toDataURL());
    let blob = new Blob([uint8Array], { type: contentType });

    // Create a FormData object and append the blob
    let formData = new FormData();
    formData.append("file", blob, "filename.png");

    return formData.get("file");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={t("Schimbă poza de profil")}
      buttonClose={t("BACK")}
      buttonFinish={t("COMPLETE")}
      onClickButtonFinish={onSubmitFunc}
      onClickButtonClose={() => {
        setName("");
        setImage(null);
        setOpen(false);
        cropperRef.current = null;
      }}
      width="650px"
      maxWidth="650px"
    >
      <div className={styles.changeContainer}>
        <div className={styles.changeLeft}>
          <div>
            <label htmlFor="file-upload" className={styles.customFileUpload}>
              Selectează o imagine nouă
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} />
          </div>

          {(userPhoto || image) && (
            <Button
              variant="contained"
              component="label"
              onClick={getCropData}
              endIcon={<AttachFileIcon />}
              sx={{
                width: "252px",
                height: "52px",
                padding: "6px 12px",
                backgroundColor: "#5B80BA",
                borderRadius: "10px",
              }}
            >
              {"Decupează"}
            </Button>
          )}
        </div>
        <div className={styles.changeRight}>
          <Avatar
            src={userPhoto ? userPhoto : image ? image : DefaultUserPicture}
            alt={userData.firstName}
            sx={{
              width: "150px",
              height: "150px",
              // svg: { width: "150px", height: "150px" },
              // margin: "0 auto",
            }}
          ></Avatar>
          <div>
            <Cropper
              ref={cropperRef}
              style={{ height: 200, width: "100%", marginTop: "10px" }}
              // zoomTo={0.5}
              aspectRatio={800 / 800}
              initialAspectRatio={16 / 9}
              preview=".img-preview"
              src={image ? image : userPhoto}
              viewMode={1}
              minCropBoxWidth={800}
              minCropBoxHeight={800}
              // background={false}
              responsive={true}
              autoCropArea={1}
              autoCrop={true}
              // checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={false}
              crop={handleCrop}
              // onInitialized={onInitialized}
            />
          </div>
        </div>
        {image ? (
          <img
            src={cropData}
            alt="crop"
            style={{ width: "auto", height: "300px" }}
          />
        ) : (
          <></>
        )}
      </div>
    </CustomDialog>
  );
};

export default ChangeProfilePicture;
