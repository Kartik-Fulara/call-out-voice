import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import Header from "../components/home/Header/index";
import SideBar from "../components/home/SideBar/index";
import Content from "../components/home/Content/index";
import { ipcRenderer } from "electron";


function Home() {

  const games = [
    {
      name: "Valorant",
    }
  ]

  const [appName, setAppName] = useState(games[0].name);


  const [selectedTab, setSelectedTab] = useState("default");

  const [checked, setChecked] = useState("default");

  const [isSendReq, setIsSendReq] = useState(true);

  const [audioInputs, setAudioInputs] = useState([]);

  const [selectedInput, setSelectedInput] = useState<string>();

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
    setIsSendReq(true);
    ipcRenderer.on("response-process-audioinputs", (event, arg) => {
      if (!isSendReq) return;
      console.log(arg);
      setAudioInputs(arg);
      setIsSendReq(false);
      // open the generated file
    });
  };

  const startTracking = () => {
    // console.log("generate callouts");
    const args = [selectedInput];
    ipcRenderer.send("run-python-script", args);
    setIsSendReq(true);
    ipcRenderer.on("python-script-response", (event, arg) => {
      if (!isSendReq) return;
      console.log(arg);
      //   setAudioInputs(arg);
      //   setIsSendReq(false);
      // open the generated file
    });
  };

  useEffect(() => {
    iniInputDevices();
  }, []);

  useEffect(() => {
    console.log(audioInputs);
  }, [audioInputs])

  const handleDropChange = (e) => {
    setSelectedInput(e.target.value);
  };

  const contentParams = {
    appName,
    selectedTab,
    setSelectedTab,
    checked,
    setChecked,
    isSendReq,
    setIsSendReq,
    
    setAudioInputs,
    
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
