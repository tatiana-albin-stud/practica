import { toast } from "react-toastify";

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const handleError = (error) => {
  console.error(error);
  const errorKey = Object.keys(error.response.data.errors)[0];
  toast.error(capitalize(error.response.data.errors[errorKey]));
};

export const getPaymentStatusColor = (value, total) => {
  if (value === 0) return "#F88078";
  if (total <= value) return "#7BC67E";
  return "#FFB547";
};

export const getStatusColor = (value) => {
  switch (value) {
    case "activeMember":
      return "#5cb85c";
    case "exMember":
      return "#d9534f";
    case "guest":
      return "#f0ad4e";
    case "leader":
      return "#337ab7";
    case "manager":
      return "#337ab7";
    default:
      return "#ffffff";
  }
};

export const getUserType = (type) => {
  switch (type) {
    case "activeMember":
      return "Membru activ";
    case "exMember":
      return "Membru inactiv";
    case "guest":
      return "Invitat";
    case "leader":
      return "Lider";
    case "manager":
      return "Manager";
    default:
      return "nu";
  }
};

export const getTaxDetailsColor = (value) => {
  if (value === "Completare dosar") return "#64B6F7";
  if (value === "Verificare/semnare") return "#2196F3";
  if (value === "Fara alocatie") return "#F88078";
  return "#21c5f3";
};

export const uploadSingleFile = async (e, callback, type) => {
  const file = e.target.files[0];

  let typeValidation;

  if (type === "image") {
    typeValidation = ["image/jpeg", "image/png"];
  } else if (type === "file") {
    typeValidation = ["application/pdf"];
  } else if (type === "all") {
    typeValidation = ["image/jpeg", "image/png", "application/pdf"];
  }

  if (file.size / 1024 / 1024 > 5) {
    callback({
      message: "The file size is bigger than 5MB!",
      blob: null,
      info: null,
    });
  } else {
    if (typeValidation.find((type) => type === file.type)) {
      try {
        callback({
          message: null,
          blob: file,
          info: {
            name: file.name,
          },
        });
      } catch (err) {
        callback({
          message: "Something went wrong! Please try uploading the file again!",
          blob: null,
          info: null,
        });
      }
    } else {
      callback({
        message:
          type === "image"
            ? "Wrong file type! Only JPEG, PNG formats are supported!"
            : type === "file"
            ? "Wrong file type! Only PDF format is supported!"
            : "Wrong file type! Only JPEG, PNG and PDF formats are supported!",
        blob: null,
        info: null,
      });
    }
  }
};

export const commonValuesInTwoObjects = (obj1, obj2) =>
  Object.keys(obj1).reduce(
    (result, key) =>
      obj1[key] && obj1[key] === obj2[key]
        ? { ...result, [key]: obj1[key] }
        : typeof obj1[key] === "object" && obj1[key] !== null
        ? { ...result, [key]: commonValuesInTwoObjects(obj1[key], obj2[key]) }
        : result,
    {}
  );

export const calculatePercentage = (done, total) => {
  let procent;
  if (done === null) procent = 0;
  else procent = (done * 100) / total;

  return procent.toFixed(2);
};

export const getProcentColor = (procent) => {
  let color = "#FF4B55";
  if (procent >= 19.99) color = "#5B80BA";
  if (procent >= 99.99) color = "#009C10";

  return color;
};
