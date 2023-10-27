import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

interface Props {
    params: { id: string }
}
const IssueDetailPage = async ({ params: { id } }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })

    if (!issue)
        notFound()
    return (
        <Grid columns={{ initial: '1', md: '5' }} gap={'5'} >
            <Box className='col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex gap={'4'} direction={'column'}>
                    <EditIssueButton issueId={id} />
                    <DeleteIssueButton issueId={id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage