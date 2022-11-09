import React from 'react'
import PratProf from "../assets/Prat.jpg";
import { BsFacebook } from "react-icons/bs";
import { DiGithub } from "react-icons/di";


function Cards({name, place, image, description}) {
  return (
    <>
      <div className="relative max-w-md mx-auto md:max-w-xs mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
        <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
                <div className="relative">
                    <img src={PratProf} alt="profpic" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                </div>
            </div>
            
        </div>
        <div className="text-center mt-20">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{name}</h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Odisha, India
            </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  <BsFacebook />
                  <DiGithub />
                </p>
                </div>
            </div>
        </div>
    </div>
</div>


    </>
  )
}

export default Cards



// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Tooltip,
// } from "@material-tailwind/react";
// import {BsFacebook} from "react-icons/bs";
 
// function Cards({name, role, image, linkedin, github, twitter, email}) {
//   return (
//     <Card className="w-96">
//       <CardHeader floated={false} className="h-80">
//         <img src={PratProf} />
//       </CardHeader>
//       <CardBody className="text-center">
//         <Typography variant="h4" color="blue-gray" className="mb-2">
//           {name}
//         </Typography>
//         <Typography color="blue" className="font-medium" textGradient>
//           {role}
//         </Typography>
//       </CardBody>
//       <BsFacebook />
//       <CardFooter className="flex justify-center gap-7 pt-2">
//         <Tooltip content="Like">
//           <Typography
//             as="a"
//             href="#facebook"
//             variant="lead"
//             color="blue"
//             textGradient
//           >
//             <BsFacebook />
//           </Typography>
//         </Tooltip>
//         <Tooltip content="Follow">
//           <Typography
//             as="a"
//             href="#twitter"
//             variant="lead"
//             color="light-blue"
//             textGradient
//           >
//             <i className="fab fa-twitter" />
//           </Typography>
//         </Tooltip>
//         <Tooltip content="Follow">
//           <Typography
//             as="a"
//             href="#instagram"
//             variant="lead"
//             color="purple"
//             textGradient
//           >
//             <i className="fab fa-instagram" />
//           </Typography>
//         </Tooltip>
//       </CardFooter>
//     </Card>
//   );
// }


// export default Cards;