'use server'
 
import { revalidateTag } from 'next/cache'

export default async function revalidateAction(tag: string) {
  revalidateTag(tag)
}