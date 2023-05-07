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

      console.log(arg);
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

  useEffect(() => {
    const args = [selectedInput];

    const init = async () => {
      const processes = await tasklist()

      const valorantProcess = processes.find((process) => {
        return process.imageName === "VALORANT.exe";
      }
      );

      // if valorant process is not found
      if (!valorantProcess) {
        setTrackStatus("stopped");
        alert("Valorant is not running");
        return;
      }

      if (trackStatus === "waiting") {
        setTrackStatus("tracking");
      }

    }

    if (trackStatus === "waiting") {
      init();
      return;
    }


    const timer = setInterval(async () => {

      if (trackStatus === "stopped") {
        clearInterval(timer);
      }


      if (trackStatus === "tracking") {

        // console.log("run python script")

        // ipcRenderer.send("run-python-script", args);

        // ipcRenderer.on("python-script-response", (event, arg) => {

        //   console.log(arg);
        //   //   setAudioInputs(arg);
        //   //   setIsSendReq(false);
        //   // open the generated file
        // });

        // it check valorant is running or not
        const processes = await tasklist();
        const valorantProcess = processes.find((process) => {
          return process.imageName === "VALORANT.exe";
        }
        );

        // if valorant process is not found
        if (!valorantProcess) {
          setTrackStatus("stopped");
          alert("Valorant is not running");
        }

        console.log("tracking")
      }

    }, 500);

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
