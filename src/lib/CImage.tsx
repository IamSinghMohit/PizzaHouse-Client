"use client";
 
import { CldImage as CldImageDefault, CldImageProps }  from 'next-cloudinary';
 
const CImage = (props: CldImageProps) => {
  return <CldImageDefault {...props} />
}
 
export default CImage;