'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { Avatar, Box, Container, Text, DropdownMenu, Flex } from '@radix-ui/themes'
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
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar src={session.user?.image!} fallback={'?'} size={'2'} radius='full' className='cursor-pointer' />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content >
                                    {/* <DropdownMenu.Label color='black'>
                                        <Text size={'3'} >{session.user?.name}</Text>
                                    </DropdownMenu.Label> */}
                                    <DropdownMenu.Label>
                                        <Text size={'3'} >{session.user?.email}</Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item><Link href='/api/auth/signout'>Log Out</Link></DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        }
                        {status === 'unauthenticated' &&
                            <Link href='/api/auth/signin'>Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar