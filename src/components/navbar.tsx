// react
import React from 'react';

// components
import Link from 'next/link';

// styles
import styles from '../styles/components/Navbar.module.css';
import cx from 'classnames';
// icons
import { Bars3Icon } from '@heroicons/react/20/solid';

export default function Navbar({
    active,
}: {
    active: string;
}) {
    const [isMenuOpen, setMenuOpen] = React.useState(false);

    return (
        <nav
            className={cx(
                'md:bg-transparent md:dark:bg-transparent bg-white border-gray-200 px-2 sm:px-4 py-5 dark:bg-gray-800'
            )}
        >
            <div className='flex flex-wrap justify-between md:justify-start items-center mx-auto'>
                <Link href='/' className='pr-2'>
                    {/* <img
                        width={50}
                        height={50}
                        alt='CASTL logo'
                        src='/logo-trans.png'
                    />{' '} */}
                    <span className='self-center text-xl font-semibold whitespace-nowrap text-slate-700 md:text-slate-700 dark:text-white'>
                        Scibowl Nexus
                    </span>
                </Link>
                <button
                    data-collapse-toggle='mobile-menu'
                    type='button'
                    className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    <Bars3Icon className='h-5 w-5 text-gray-500 dark:text-white' />
                </button>
                <div
                    className={cx(
                        { hidden: !isMenuOpen },
                        'w-full md:block md:w-auto md:grow'
                    )}
                    id='mobile-menu'
                >
                    <div className='md:flex md:justify-between'>
                        <ul
                            className={cx(
                                'flex flex-col ease-in-out duration-500 mt-4 mx-6 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium'
                            )}
                        >
                            <li>
                                <Link
                                    href='/'
                                    className={cx(styles.navLink, {
                                        'bg-blue-700 md:bg-transparent text-slate-50 md:text-blue-600 dark:text-white':
                                            active === 'home',
                                        'text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:hover:text-white dark:border-gray-700':
                                            active !== 'home',
                                    })}>
                                    
                                        Home
                                    
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/add-question'
                                    className={cx(styles.navLink, {
                                        'bg-blue-700 md:bg-transparent text-slate-50 md:text-blue-600 dark:text-white':
                                            active === 'contact',
                                        'text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:hover:text-white dark:border-gray-700':
                                            active !== 'contact',
                                    })}>
                                    
                                        Contact
                                    
                                </Link>
                            </li>
                        </ul>
                        <ul
                            className={cx(
                                'flex flex-wrap space-x-3 mt-4 mx-6 md:flex-row md:space-x-3 md:mt-0 md:text-sm md:font-medium'
                            )}
                        >
                            <li>
                                <a href='#learn-more'>
                                    <button
                                        className={cx(
                                            styles.navButton,
                                            styles.blue
                                        )}
                                    >
                                        Learn more
                                    </button>
                                </a>
                            </li>
                            <li>
                                <a href='#get-started'>
                                    <button
                                        className={cx(
                                            styles.navButton,
                                            styles.blue
                                        )}
                                    >
                                        Get started
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}