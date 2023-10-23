'use client'
import React, { useState } from 'react'
import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/ValidationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof issueSchema>


const NewIssue = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [isSubmited, setisSubmited] = useState(false)
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(issueSchema)
    })
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
                        setisSubmited(true)
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        setisSubmited(false)
                        setError('an unexpected error occurred.')
                    }
                })} className=' space-y-3' >
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmited}>Submit New Issue {isSubmited && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssue