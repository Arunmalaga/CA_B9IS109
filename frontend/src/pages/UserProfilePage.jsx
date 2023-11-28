import React from 'react'
import {Navbar} from '../features/navbar/components/Navbar'
import { UserProfile } from '../features/user/components/UserProfile'


export const UserProfilePage = () => {
  return (
    <>
    <Navbar/>
    <UserProfile/>
    </>
  )
}
