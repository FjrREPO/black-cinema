"use client";

import React, { useState } from 'react'
import TableMovies from './_components/TableMovies'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Search, SquarePlus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

function page() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className='w-full mt-10 px-5'>
            <div className='flex flex-row justify-between mb-5 w-full'>
                <div className='flex flex-row w-[200px] relative'>
                    <Input
                        type={'text'}
                        className='w-full'
                        placeholder='Search by title'
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        variant={'secondary'}
                        className='absolute inset-y-0 right-0'
                    >
                        <Search />
                    </Button>
                </div>
                <div className='flex flex-row justify-end'>
                    <Link
                        href={'/dashboard/movies/add'}
                        className={cn(
                            buttonVariants({ variant: "outline", size: 'lg' }),
                            "text-lg text-muted-foreground hover:text-foreground gap-2"
                        )}
                    >
                        <Label>Tambah</Label>
                        <SquarePlus />
                    </Link>
                </div>
            </div>
            <TableMovies searchQuery={searchQuery}/>
        </div>
    )
}

export default page