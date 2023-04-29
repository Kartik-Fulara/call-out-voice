import React,{useEffect, useState} from 'react';
import Head from 'next/head';

import Header from "../components/home/Header/index";
import SideBar from "../components/home/SideBar/index";
import Content from "../components/home/Content/index";



function Home() {

  

  const games = [
    {
      name: "Valorant",
    }
  ]

  const [appName,setAppName] = useState(games[0].name);

  return (
    <React.Fragment>
      <Head>
        <title>Call Out Voice</title>
      </Head>

      <Header />

      <section className='w-full h-full flex items-start justify-start'>
        <SideBar setAppName={setAppName} gamesCount={games.length} />
        <Content appName={appName} />
      </section>


    </React.Fragment>
  );
}

export default Home;
