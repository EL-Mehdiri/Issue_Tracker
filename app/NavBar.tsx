'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { Box, Container, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()
    const links = [
        { lable: 'Dashboard', href: '/' },
        { lable: 'Issues', href: '/issues/list' },
    ]
    return (
        <nav className='  border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify={'between'} >
                    <Flex align={'center'} gap={'3'}>
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
                    </Flex>
                    <Box >
                        {status === 'authenticated' &&
                            <Link href='/api/auth/signout'>Log Out</Link>}
                        {status === 'unauthenticated' &&
                            <Link href='/api/auth/signin'>Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar