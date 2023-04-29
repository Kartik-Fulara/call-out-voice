import React, { useState } from 'react'
import styles from '../styles.module.css';
import axios from 'axios';

const index = ({ appName }: any) => {

    const [selectedTab, setSelectedTab] = useState("default");

    const [checked, setChecked] = useState("default");

    const tabs = [{
        name: "default",
        content: "Default CallOuts"
    },
    {
        name: "aiGenerated",
        content: "Ai Generated CallOuts"
    },
    {
        name: "custom",
        content: "Custom CallOuts"
    }
    ]

    const generateCallOuts = async () => {
        const res = await axios.get('http://127.0.0.1:6969/api/hello',{
            params:{
                appName:appName
            }
            
        });
        console.log(res.data);
    }


    return (
        <section className={styles.mainContentWrapper}>
            <div className={styles.appDetails}>
                <img src="/images/Games/Valorant.svg" alt="app image" className='h-full w-[170px] object-cover' />
                <div className='h-full flex flex-col gap-2 items-start'>
                    <h1 className='text-2xl font-bold'>{appName}</h1>
                    <button className={styles.launchBtn} onClick={()=>generateCallOuts()}>
                        Launch
                    </button>
                </div>
            </div>

            <div className={styles.callOuts}>
                <div className={styles.tabs}>
                    {
                        tabs.map((tab) => (
                            <div key={tab.name} className={`${styles.tab} ${selectedTab === tab.name && styles.tabSelected}`}
                                onClick={() => setSelectedTab(tab.name)}
                            >
                                {tab.content}
                            </div>
                        ))
                    }
                </div>

                <div className={styles.useCallOutBox}>
                    {
                        tabs.map((tab => (
                            tab.name === selectedTab && (
                                <div key={tab.name} className='flex gap-2'>

                                    <input checked={tab.name === checked} type="checkbox" name={tab.name} id={tab.name} onChange={() => setChecked(tab.name)} />
                                    <label htmlFor={tab.name} className={styles.callOutsLabel}>
                                        Use {tab.content}
                                    </label>

                                </div>
                            )
                        )))
                    }

                    {
                        selectedTab === "aiGenerated" && (
                            <button className={styles.generatedBtn}>
                                Generate CallOuts
                            </button>
                        )
                    }

                    {
                        selectedTab === "custom" && (
                            <button className={styles.generatedBtn}>
                                Save CallOuts
                            </button>
                        )
                    }

                    {
                        selectedTab === "default" && (
                            <button className={styles.generatedBtn}>
                                Change
                            </button>
                        )
                    }

                </div>

                <div className={styles.callOutContent}>
                    <div className='flex gap-4 flex-col'>
                        <label htmlFor="buy">Buy Phase Callout</label>
                        <label htmlFor="win">Win Callout</label>
                        <label htmlFor="spectate">Spectate Callout</label>
                        <label htmlFor="lose">Lose Callout</label>
                    </div>
                    <div className='flex gap-4 flex-col'>
                        <input id="buy" type="text" disabled={selectedTab!=="custom"} placeholder='Buy Phase Message' className={styles.callOutInput} />
                        <input id="win" type="text" disabled={selectedTab!=="custom"} placeholder='Win Message' className={styles.callOutInput} />
                        <input id="spectate" type="text" disabled={selectedTab!=="custom"} placeholder='Spectate Message' className={styles.callOutInput} />
                        <input id="lose" type="text" disabled={selectedTab!=="custom"} placeholder='Lose Message' className={styles.callOutInput} />
                    </div>

                </div>

            </div>

        </section>
    )
}

export default index