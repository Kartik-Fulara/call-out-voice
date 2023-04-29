import Link from 'next/link'
import React from 'react'
import styles from "../styles.module.css"

const index = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div className={styles.leftNavBar}>
          <h4 className='uppercase'>Call Out Voice</h4>
        </div>
        <div className={styles.rightNavBar}>
          <button className={styles.learnMoreBtn}>
            <p className={styles.btnText}>
              LEARN MORE
            </p>
            <p className={styles.bottomBorder}></p>
          </button>
          {/* <Link href="/auth/login">
            <a className=' px-5 py-2 rounded bg-dark-blue hover:bg-light-blue shadow-xl  text-sm '>
              Login
            </a>
          </Link> */}
        </div>
      </nav>

      {/* <div className={styles.searchGames}>
        <div className={styles.searchBar}>
          <input type="text" placeholder='Search...' className={styles.searchInput} />
          <button className={styles.searchBtn} aria-label='Search Btn'>
            <img src='/images/search.svg' alt='search icon' className='h-full w-full ' />
          </button>
        </div>
        <div className='flex gap-2'>
          <button className={styles.scanGames}>
            Scan Games
          </button>
          <button className={styles.scanGames}>
            Add Games
          </button>
        </div>
      </div> */}

    </header>
  )
}

export default index
