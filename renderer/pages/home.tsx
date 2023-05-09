import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import Header from "../components/home/Header/index";

import Content from "../components/home/Content/index";
import { ipcRenderer } from "electron";
import { tasklist } from 'tasklist';

function Home() {

  const games = [
    {
      name: "VALORANT",
    }
  ]

  const [appName, setAppName] = useState(games[0].name);


  const [selectedTab, setSelectedTab] = useState("default");

  const [checked, setChecked] = useState("default");



  const [audioInputs, setAudioInputs] = useState([]);

  const [selectedInput, setSelectedInput] = useState<string>();

  const [trackStatus, setTrackStatus] = useState("stopped");

  // const [detectRunning, setDetectRunning] = useState(false)
  let detectRunning = false



  // const tabs = [{
  //     name: "default",
  //     content: "Default CallOuts"
  // },
  // {
  //     name: "aiGenerated",
  //     content: "Ai Generated CallOuts"
  // },
  // {
  //     name: "custom",
  //     content: "Custom CallOuts"
  // }
  // ]

  const tabs = [
    {
      name: "default",
      content: "Default CallOuts",
    },
  ];

  const iniInputDevices = () => {
    console.log("generate callouts");
    ipcRenderer.send("start-process-audioinputs");

    ipcRenderer.on("response-process-audioinputs", (event, arg) => {

      // console.log(arg);
      setAudioInputs(arg);

      // open the generated file
    });
  };



  const startTracking = () => {
    if (trackStatus === "stopped") {
      setTrackStatus("waiting");
    } else if (trackStatus === "tracking") {
      setTrackStatus("stopped");
    }
  };

  //Check If Process is running
  const processChecker = async () => {
    const processes = await tasklist()

    const valorantProcess = processes.find((process) => {
      return process.imageName === "VALORANT.exe";
    });

    // if valorant process is not found
    if (!valorantProcess) {
      return false;
    }
    return true;
  }

  useEffect(()=>{
    ipcRenderer.send("start-process-test")
  },[])

   useEffect(() => {
     const args = [selectedInput];
     console.log("trackStatus=>", trackStatus);

     const init = async () => {

       const isProcessRunning = await processChecker()
       if (!isProcessRunning) {
         alert("Valorant is not running");
         return setTrackStatus("stopped");
       } else if (trackStatus === "waiting") {
         return setTrackStatus("tracking");
       }
     }
     if (trackStatus === "waiting") {
       init()
       return
     }

     const timer = setInterval(async () => {

       if (trackStatus === "stopped") {
         // script to stop tracking
         clearInterval(timer);
         ipcRenderer.send("stop-process-detection" , "stop!")
         detectRunning = false
         return;
       }


       if (trackStatus === "tracking") {
         console.log("detectRunning=>", detectRunning);

         // console.log("run python script")
         if (detectRunning === false) {
           detectRunning = true
           ipcRenderer.send("start-process-detection", args);
         }

         const isProcessRunning = await processChecker()
         if (!isProcessRunning) {
           alert("Valorant is not running");
           setTrackStatus("stopped");
         }


         console.log("tracking")
       }

     }, 5000);

     return () => clearInterval(timer);


   }, [trackStatus])



  useEffect(() => {
    iniInputDevices();
  }, []);

  const handleDropChange = (e) => {
    setSelectedInput(e.target.value);
  };

  const contentParams = {
    appName,
    selectedTab,
    setSelectedTab,
    checked,
    setChecked,

    setAudioInputs,

    trackStatus,
    setTrackStatus,

    setSelectedInput,
    iniInputDevices,
    startTracking,
    tabs,
  }

  const headerParams = {
    audioInputs,
    handleDropChange,
    selectedInput
  }

  return (
    <React.Fragment>
      <Head>
        <title>Call Out Voice</title>
      </Head>

      <Header headerParams={headerParams} />

      <section className='w-full h-full flex items-start justify-start'>
        {/* <SideBar setAppName={setAppName} gamesCount={games.length} /> */}
        <Content contentParams={contentParams} />
      </section>


    </React.Fragment>
  );
}

export default Home;
