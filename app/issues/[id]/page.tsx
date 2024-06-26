import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOption from '@/app/auth/authOption'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
    params: { id: string }
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }))

const IssueDetailPage = async ({ params: { id } }: Props) => {
    const session = await getServerSession(authOption);

    const issue = await fetchUser(parseInt(id))

    if (!issue)
        notFound()
    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap={'5'} >
            <Box className='md:col-span-4 '>
                <IssueDetails issue={issue} />
            </Box>
            {
                session && <Box>
                    <Flex gap={'4'} direction={'column'}>
                        <AssigneeSelect issue={issue} />
                        <EditIssueButton issueId={id} />
                        <DeleteIssueButton issueId={id} />
                    </Flex>
                </Box>
            }
        </Grid>
    )
}

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id))
    return {
        title: issue?.title,
        description: `Viewing ${issue?.title}`
    }

}

export default IssueDetailPage

