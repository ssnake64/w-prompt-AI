'use client'

import { useState } from "react";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

export const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {
  const { data : session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setcopied] = useState("")

  const handleCopy = () =>{
    setcopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=> setcopied(""), 3000)
  }
  const handleProfileClick = () =>{
    if(post.creator._id === session?.user.id){
      return router.push('/profile')
    }

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }
 
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex flex-row justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
          <Image 
          src={post.creator.image}
          alt="user_image"
          width={35}
          height={35}
          className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
          <h3 className='font-satoshi text-sm font-semibold text-gray-900'>
            {post.creator.username}
            </h3>
          <p className='font-inter text-xs text-gray-500'>
            {post.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
        <Image
        src={copied === post.prompt?
          '/assets/icons/tick.svg'
          : '/assets/icons/copy.svg'
        }
        width={18}
        height={18}
        />
        </div>
      </div>
        <p className='my-4 font-satoshi text-sm'>{post.prompt}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={()=> handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>

        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className='flex justify-center gap-4 mt-8 border-t border-gray-100'>
            <button className='font-inter text-sm text-white bg-green-500 hover:bg-green-600 w-16 h-8 rounded-full cursor-pointer' onClick={handleEdit}>Edit</button>
            <button className='font-inter text-sm text-white bg-orange-500 hover:bg-orange-600 w-16 h-8  rounded-full cursor-pointer' onClick={handleDelete}>Delete</button>
          </div>
        )}
    </div>
  )
}
