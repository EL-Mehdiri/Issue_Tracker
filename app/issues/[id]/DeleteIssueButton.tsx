'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger >
                <Button color='red'>Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                <AlertDialog.Description>
                    This action cannot be undone and will permanently delete the issue.
                </AlertDialog.Description>
                <Flex mt={'4'} gap={'3'}>
                    <AlertDialog.Cancel onClick={() => { }}>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action onClick={() => { }}>
                        <Button color='red'>Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton