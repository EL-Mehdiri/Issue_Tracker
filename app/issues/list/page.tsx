
import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery, columnNamems } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
    searchParams: IssueQuery
}

const Issues = async ({ searchParams }: Props) => {



    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const where = { status }
    const orderBy = columnNamems.includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;
    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize
    })
    const issueCount = await prisma.issue.count({ where })

    return (
        <Flex direction={'column'} gap='3'>
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize} />
        </Flex >
    )
}
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Issue Tracker - Issue List",
    description: "List of all the project issues"
}

export default Issues
