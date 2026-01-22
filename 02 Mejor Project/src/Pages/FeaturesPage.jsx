import React from 'react'
import BreadCrumb from "../Components/BreadCrumb"; 
import Features from '../Components/Features'

export default function FeaturesPage() {
  return (
    <div className='page-content'>
      <BreadCrumb title={"Features"}/>
      <Features/>
    </div>
  )
}
