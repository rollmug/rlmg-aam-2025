'use client';

import Image from "next/image";
import React from "react"; // , { useState, useRef, forwardRef }
import { motion } from "framer-motion";
// import { Header } from "../typography/Header";
// import { marked } from "marked";
// import { stripHtml } from "string-strip-html";
// import smartquotes from "smartquotes";

const formatImageURL = (image, presetKey) => {
    return `${process.env.NEXT_PUBLIC_FILES_BASE_URL}/${image.id}/${encodeURIComponent(image.filename_download)}${presetKey ? `?key=${presetKey}` : ''}`;
};

export const TeamMember = ({ firstName, lastName, jobTitle, photo, bio }) => {
    const photoUrl = typeof photo === 'object' ? formatImageURL(photo) : photo;
    // const openModalRef = useRef();
    // const [modalOpen, setModalOpen] = useState(false);

    // const openModal = () => {
    //     openModalRef.current.showModal();
    //     setModalOpen(!modalOpen);
    // }

    const transition = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    const variants = {
        hidden: { filter: "blur(10px)", transform: "translateY(1rem)", opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    };

    return (
        <>
            <div className="team-member flex flex-col w-full">
                <div className="_aspect-w-3 _aspect-h-4 _slanted-top-slightly">
                    <motion.div initial={variants.hidden} whileInView={variants.visible} transition={transition} className="relative aspect-w-3 aspect-h-4 slanted-top-slightly">
                        <Image fill sizes={`(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw`} src={photoUrl} alt={`${firstName} ${lastName}`} className="object-cover object-center cursor-pointer transition-all duration-500 ease-in-out grayscale hover:grayscale-0" />
                    </motion.div>
                </div>
                <h3 className="text-sm2/4 lg:text-lg/4 mt-2 lg:mt-4 mb-1">{firstName} {lastName}</h3>
                <p className="my-0 text-sm2 hidden md:block">{jobTitle}</p>
                {/* <p>{bio}</p> */}
            </div>

            {/* <TeamMemberModal ref={openModalRef} name={`${firstName} ${lastName}`} jobTitle={jobTitle} bio={bio} image={photo} /> */}
        </>
    );
};

// const TeamMemberModal = forwardRef(({ name, jobTitle, bio, image }, ref) => {
//     const photoUrl = typeof image === 'object' ? formatImageURL(image) : image;

//     const bioText = smartquotes(stripHtml(marked.parse(bio), {
//         ignoreTags: ['p', 'i', 'em', 'b', 'strong']
//     }).result);

//     return (
//         <dialog className="member-bio-modal modal shadow-lg bg-base-content bg-opacity-90" ref={ref}>
//             <div className="modal-box bg-white !rounded-none relative p-6 w-full md:w-4/5 max-w-3xl">

//                 <form method="dialog">
//                     <button className="absolute z-10 top-2 right-2 md:top-4 md:right-4 text-lg text-secondary outline-none focus:outline-none p-4">
//                         <CloseIcon />
//                     </button>

//                     <div className="flex flex-col md:flex-row mt-7 lg:mt-4 p-2 gap-4 md:gap-6 lg:gap-10">

//                         <section className="flex-auto md:w-1/4">
//                             <Image src={photoUrl} alt={`${name}`} width={image.width} height={image.height} className="w-full" />
//                         </section>

//                         <section className="flex-auto md:w-3/4">
//                             <Header element="h3" className="text-secondary text-lgr font-black mt-0 mb-1">{name}</Header>
//                             <p className="text-sm md:text-sm2/6 mt-0 font-bold">{jobTitle}</p>
//                             <div className="bio-text text-sm md:text-sm2/7" dangerouslySetInnerHTML={{ __html: bioText }} />
//                         </section>
//                     </div>

//                 </form>
//             </div>
//             <form method="dialog" className="modal-backdrop">
//                 <button>close</button>
//             </form>
//         </dialog>
//     );
// });

// TeamMemberModal.displayName = TeamMemberModal;

// const CloseIcon = (props) => {
//     return (
//         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" width="1em" viewBox="0 -960 960 960" {...props}>
//             <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
//         </svg>
//     )
// }

export const sampleMember = {
    "firstName": "Richard",
    "jobTitle": "Founder",
    "lastName": "Lewis",
    "bio": "",
    "photo": {
        "__typename": "directus_files",
        "id": "34dd5344-1489-46f4-8692-e9e089940d5a",
        "filename_disk": "34dd5344-1489-46f4-8692-e9e089940d5a.jpg",
        "filename_download": "2017_0426_021227.jpg"
    }
};