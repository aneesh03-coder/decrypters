import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  caseTitle: yup.string().required('The case title is required!'),
  requesterContact: yup.string().required('The requester contact is required!'),
  patientAddress: yup.string().required('The patient address is required!'),
  patientDescription: yup
    .string()
    .required('The Description field is required!'),
  amountGoal: yup.string().required('The amount goal is required!'),
  patientAge: yup.string().required('The patient age is required!'),
  patientGender: yup.string().required('The patient gender is required!'),
  patientName: yup.string().required('The patient name is required!'),
  relation: yup.string().required('The relation is required!'),
});

let imagesArray = [
  'https://unsplash.com/photos/yg1Zayn0Few',
  'https://unsplash.com/photos/eRExodEMiOE',
  'https://unsplash.com/photos/98__MsKaUsI',
  'https://unsplash.com/photos/zQEmEAb-WpY',
  'https://unsplash.com/photos/bM4MXYPY61U',
  'https://unsplash.com/photos/DjrtjX-obcE',
  'https://unsplash.com/photos/5zp0jym2w9M',
  'https://unsplash.com/photos/UkUz15Rzkic',
  'https://unsplash.com/photos/tMFeatBSS4s',
  'https://unsplash.com/photos/brbF5FSnSgI',
  'https://unsplash.com/photos/GwgFPDXiSIs',
  'https://unsplash.com/photos/J12RfFH-2ZE',
  'https://unsplash.com/photos/ne2mqMgER8Y',
];
const randomImage = () => {
  return imagesArray[Math.floor(Math.random() * imagesArray.length)];
};

const successNotification = () =>
  toast.success('You request have been submitted successfully', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const errorNotification = () =>
  toast.error('Oh oh! Something went wrong!', {
    position: 'top-center',
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



  const response = await fetch('/api/addCampaign', {
    method: 'POST',
    body: JSON.stringify({ newCampaign }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  try {
    const response = await fetch('/api/addCampaign', {
      method: 'POST',
      body: JSON.stringify({ newCampaign }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    successNotification();
  } catch (err) {
    errorNotification();
  }

};

console.log(randomImage());

export default function Request() {
  const router = useRouter();
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
      caseTitle: '',
      requesterContact: '',
      patientAddress: '',
      patientDescription: '',
      amountGoal: '',
      patientAge: '',
      patientGender: '',
      patientName: '',
      relation: '',
    });

    setTimeout(() => {
      router.push('/');
    }, 6000);
  };

  console.log(errors);

  return (
    <div className='grid grid-cols-1 my-20'>
      <ToastContainer
        position='top-center'
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
        className='max-w-[700px] w-full mx-auto bg-slate-100 p-8 px-8 rounded-lg'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='text-4xl text-center my-6'>Request a case</h3>
        <div className='my-2'>
          <Controller
            name='caseTitle'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Case title'
                variant='filled'
                error={!!errors.caseTitle}
                helperText={errors.caseTitle ? errors.caseTitle?.message : ''}
                fullWidth
              />
            )}
          />
        </div>

        <div className='my-2'>
          <Controller
            name='requesterContact'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Requester contact'
                variant='filled'
                error={!!errors.requesterContact}
                helperText={
                  errors.requesterContact
                    ? errors.requesterContact?.message
                    : ''
                }
                fullWidth
              />
            )}
          />
        </div>

        <div className='my-2'>
          <Controller
            name='patientAddress'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Patient address'
                variant='filled'
                error={!!errors.patientAddress}
                helperText={
                  errors.patientAddress ? errors.patientAddress?.message : ''
                }
                fullWidth
              />
            )}
          />
        </div>

        <div className='my-2'>
          <Controller
            name='patientDescription'
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                rows={6}
                maxRows={4}
                {...field}
                label='Patient description'
                variant='filled'
                error={!!errors.patientDescription}
                helperText={
                  errors.patientDescription
                    ? errors.patientDescription?.message
                    : ''
                }
                fullWidth
              />
            )}
          />
        </div>
        <div className='my-2'>
          <Controller
            name='amountGoal'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Amount goal'
                variant='filled'
                error={!!errors.amountGoal}
                helperText={errors.amountGoal ? errors.amountGoal?.message : ''}
                fullWidth
                type='number'
              />
            )}
          />
        </div>
        <div className='my-2'>
          <Controller
            name='patientAge'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Patient age'
                variant='filled'
                error={!!errors.patientAge}
                helperText={errors.patientAge ? errors.patientAge?.message : ''}
                fullWidth
                type='number'
              />
            )}
          />
        </div>
        <div className='my-2'>
          <Controller
            name='patientGender'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Patient gender'
                variant='filled'
                error={!!errors.patientGender}
                helperText={
                  errors.patientGender ? errors.patientGender?.message : ''
                }
                fullWidth
              />
            )}
          />
        </div>
        <div className='my-2'>
          <Controller
            name='patientName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Patient name'
                variant='filled'
                error={!!errors.patientName}
                helperText={
                  errors.patientName ? errors.patientName?.message : ''
                }
                fullWidth
              />
            )}
          />
        </div>
        <div className='my-2'>
          <Controller
            name='relation'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Relation'
                variant='filled'
                error={!!errors.relation}
                helperText={errors.relation ? errors.relation?.message : ''}
                fullWidth
              />
            )}
          />
        </div>

        <input
          className='bg-[#a2203e] hover:cursor-pointer w-full hover:bg-[#530319] text-white font-bold py-2 px-4 rounded transition-all my-5'
          type='submit'
          value='Request'
        />
      </form>
    </div>
  );
}
