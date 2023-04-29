import React, { useState } from 'react'
import styles from "../styles.module.css";
const index = ({ setAppName, gamesCount }:any) => {

  const [selected, setSelected] = useState(0)

  const arr = [0]

  return (
    <aside className={styles.sideBar}>
      <div className={styles.sideBarWrapper}>
        <div className={`${styles.sideBarTitle} ${styles.sideBarContent}`}>
          <div className='flex gap-2 items-center'>
            <img src="/images/list.png" className='h-4' alt="list icon" />
            <span className='text-sm '>
              All Games
            </span>
          </div>
          <div className='shadow-md bg-light-blue px-2 rounded text-sm'>
            {gamesCount}
          </div>
        </div>

        <div className='w-full h-full overflow-auto'>
        {arr.map((item) => (
          <div key={item} className={`${styles.sideBarContent} ${selected === item && styles.sideBarContentSelected} ${styles.sideBarApps}`}
            onClick={() => {
              setSelected(item)
              setAppName(`Game ${item}`)
            }}
          >
            <div className='flex gap-2 h-full w-full items-center justify-start '>
              <img src="/images/Games/Valorant.svg" className='h-full object-cover' alt="game logo" />
              <span className='text-xs'>
                Valorant
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
    </aside>
  )
}

export default index