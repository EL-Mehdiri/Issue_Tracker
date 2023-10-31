'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { Avatar, Box, Container, Text, DropdownMenu, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/app/components'

const NavBar = () => {
    return (
        <nav className='  border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify={'between'} >
                    <Flex align={'center'} gap={'3'}>
                        <Link href='/'><AiFillBug /></Link>
                        <Navlink />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar


const Navlink = () => {
    const currentPath = usePathname()
    const links = [
        { lable: 'Dashboard', href: '/' },
        { lable: 'Issues', href: '/issues/list' },
    ]

    return (
        <ul className='flex space-x-6'>
            {links.map((link, index) => (
                <li className={classNames({
                    'nav-link': true,
                    '!text-zinc-900': link.href === currentPath,

                })}
                    key={index}>
                    <Link href={link.href}>{link.lable}</Link>
                </li>
            ))}
        </ul>
    )
}


const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === 'loading') return <Skeleton width={'3rem'} />
    if (status === 'unauthenticated')
        return <Link className='nav-link' href='/api/auth/signin'>Login</Link>


    return (
        <Box>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user?.image!}
                        fallback={'?'}
                        size={'2'}
                        radius='full'
                        className='cursor-pointer'
                        referrerPolicy='no-referrer' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content >
                    <DropdownMenu.Label>
                        <Text size={'3'} >{session!.user?.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item><Link href='/api/auth/signout'>Log Out</Link></DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>


        </Box >
    )
}