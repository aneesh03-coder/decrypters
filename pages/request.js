import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import firebase from "firebase/compat/app";
import { serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedInFetch } from "../store/campaignSlice";

const schema = yup.object().shape({
  caseTitle: yup.string().required("The case title is required!"),
  requesterContact: yup.string().required("The requester contact is required!"),
  patientAddress: yup.string().required("The patient address is required!"),
  patientDescription: yup
    .string()
    .required("The Description field is required!"),
  amountGoal: yup.string().required("The amount goal is required!"),
  patientAge: yup.string().required("The patient age is required!"),
  patientGender: yup.string().required("The patient gender is required!"),
  patientName: yup.string().required("The patient name is required!"),
  relation: yup.string().required("The relation is required!"),
});

let imagesArray = [
  "https://news.wisc.edu/content/uploads/2020/04/thumbnail_IMG_0248-e1588188039307-1024x755.jpg",
  "https://www.manipalhospitals.com/uploads/specialities/cancer-specialist-in-bangalore.jpeg",
  "http://www.choa.org/-/media/Images/Childrens/global/social-share-images/patients/stories/matthew-ramirez/former-pediatric-cancer-patient-now-pediatric-cancer-doctor-1200x630.jpg",
  "https://www.tatatrusts.org/Upload/Images/thumbnail/reimagining-cancer-care-sm.jpg",
  "https://my.viewmedica.com/thumbs/alzheimers_1280.jpg?v=20151114",
  "https://kettocdn.gumlet.io/media/campaign/59000/59228/image/5b0ea5b85d95d.jpeg?w=480&dpr=2.6",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBi5EARdWawjR6hN7XgQ8s8Al-9zqcHuuGjQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKg_oB190zzwpiqnhGIHM4ZvGE0OvRbgLhqA&usqp=CAU",
];
const randomImage = () => {
  return imagesArray[Math.floor(Math.random() * imagesArray.length)];
};

const successNotification = () =>
  toast.success("You request have been submitted successfully", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const errorNotification = () =>
  toast.error("Oh oh! Something went wrong!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const saveCampaign = async (submittedData) => {
  const newCampaign = {
    Title: submittedData.caseTitle,
    goal: submittedData.amountGoal,
    patient_address: submittedData.patientAddress,
    patient_age: submittedData.patientAge,
    patient_description: submittedData.patientDescription,
    patient_gender: submittedData.patientGender,
    patient_image: randomImage(),
    patient_name: submittedData.patientName,
    relation: submittedData.relation,
    requester_contact: submittedData.requesterContact,
    timestamp: serverTimestamp(),
  };
  try {
    const response = await fetch("/api/addCampaign", {
      method: "POST",
      body: JSON.stringify({ newCampaign }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    successNotification();
  } catch (err) {
    errorNotification();
  }
};

// console.log(randomImage());

export default function Request({ sessionDetails }) {
  const router = useRouter();

  // console.log(sessionDetails);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    saveCampaign(data);
    reset({
      caseTitle: "",
      requesterContact: "",
      patientAddress: "",
      patientDescription: "",
      amountGoal: "",
      patientAge: "",
      patientGender: "",
      patientName: "",
      relation: "",
    });

    setTimeout(() => {
      router.push("/");
    }, 6000);
  };

  if (!sessionDetails?.user) {
    signIn("google");
  }

  return (
    <div>
      {sessionDetails?.user == undefined ? (
        <div className="w-full h-full flex justify-center place-items-center text-3xl text-red-500">
          You need to login to start a new campaign.Redirecting you to login...
        </div>
      ) : (
        <div className="grid grid-cols-1 my-20">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <form
            className="max-w-[700px] w-full mx-auto bg-slate-100 p-8 px-8 rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-4xl text-center my-6">Request a case</h3>
            <div className="my-2">
              <Controller
                name="caseTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Case title"
                    variant="filled"
                    error={!!errors.caseTitle}
                    helperText={
                      errors.caseTitle ? errors.caseTitle?.message : ""
                    }
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="my-2">
              <Controller
                name="requesterContact"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Requester contact"
                    variant="filled"
                    error={!!errors.requesterContact}
                    helperText={
                      errors.requesterContact
                        ? errors.requesterContact?.message
                        : ""
                    }
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="my-2">
              <Controller
                name="patientAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Patient address"
                    variant="filled"
                    error={!!errors.patientAddress}
                    helperText={
                      errors.patientAddress
                        ? errors.patientAddress?.message
                        : ""
                    }
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="my-2">
              <Controller
                name="patientDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    multiline
                    rows={6}
                    maxRows={4}
                    {...field}
                    label="Patient description"
                    variant="filled"
                    error={!!errors.patientDescription}
                    helperText={
                      errors.patientDescription
                        ? errors.patientDescription?.message
                        : ""
                    }
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="my-2">
              <Controller
                name="amountGoal"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount goal"
                    variant="filled"
                    error={!!errors.amountGoal}
                    helperText={
                      errors.amountGoal ? errors.amountGoal?.message : ""
                    }
                    fullWidth
                    type="number"
                  />
                )}
              />
            </div>
            <div className="my-2">
              <Controller
                name="patientAge"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Patient age"
                    variant="filled"
                    error={!!errors.patientAge}
                    helperText={
                      errors.patientAge ? errors.patientAge?.message : ""
                    }
                    fullWidth
                    type="number"
                  />
                )}
              />
            </div>
            <div className="my-2">
              <Controller
                name="patientGender"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Patient gender"
                    variant="filled"
                    error={!!errors.patientGender}
                    helperText={
                      errors.patientGender ? errors.patientGender?.message : ""
                    }
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="my-2">
              <Controller
                name="patientName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Patient name"
                    variant="filled"
                    error={!!errors.patientName}
                    helperText={
                      errors.patientName ? errors.patientName?.message : ""
                    }
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="my-2">
              <Controller
                name="relation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Relation"
                    variant="filled"
                    error={!!errors.relation}
                    helperText={errors.relation ? errors.relation?.message : ""}
                    fullWidth
                  />
                )}
              />
            </div>

            <input
              className="bg-[#a2203e] hover:cursor-pointer w-full hover:bg-[#530319] text-white font-bold py-2 px-4 rounded transition-all my-5"
              type="submit"
              value="Request"
            />
          </form>
        </div>
      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  return {
    props: {
      sessionDetails: await getSession(context),
    },
  };
}
