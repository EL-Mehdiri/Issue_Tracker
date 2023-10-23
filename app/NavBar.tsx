'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

const NavBar = () => {
    const currentPath = usePathname()
    const links = [
        { lable: 'Dashboard', href: '/' },
        { lable: 'Issues', href: '/issues' }
    ]
    return (
        <nav className='flex space-x-6 items-center  border-b mb-5 px-5 h-14'>
            <Link href='/'><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map((link, index) => (
                    <li className={classNames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                    })}
                        key={index}>
                        <Link href={link.href}>{link.lable}</Link>
                    </li>
                ))}

            </ul>
        </nav>
    )
}

export default NavBar