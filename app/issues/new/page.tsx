'use client'
import React, { useState } from 'react'
import { Button, TextField, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios';

import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';



interface IssueForm {
    title: string,
    description: string
}

const NewIssue = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const { register, control, handleSubmit } = useForm<IssueForm>()
    return (
        <div className='max-w-xl'>
            {error &&
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }

            <form
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        setError('an unexpected error occurred.')
                    }
                })}
                className=' space-y-3'
            >
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />

                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssue