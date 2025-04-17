'use client'

import React, { useState, useRef, forwardRef } from "react";
import { TeamMember } from "./TeamMember";
import Image from "next/image";
import { ContentSection } from "../layout/ContentSection";
import { Header } from "../typography/Header";
import { marked } from "marked";
import { stripHtml } from "string-strip-html";
import smartquotes from "smartquotes";

import { AnimatePresence, motion } from "framer-motion";

const formatImageURL = (image, presetKey) => {
    return `${process.env.NEXT_PUBLIC_FILES_BASE_URL}/${image.id}/${encodeURIComponent(image.filename_download)}${presetKey ? `?key=${presetKey}` : ''}`;
};

export const TeamMembers = ({ teamMembers, headerText }) => {
    const openModalRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [activeMember, setActivemember] = useState(null);

    const openModal = (memberData) => {
        setActivemember(memberData);
        openModalRef.current.showModal();
        setModalOpen(!modalOpen);
    }

    return (
        <ContentSection standout={true}>
            <div className={`section-padded`}>
                {headerText && <h2 className="mt-4 mb-8 lg:mb-12">{headerText}</h2>}
                <div className="team-members grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-6 lg:gap-y-12">
                    {teamMembers.map((member, index) => {
                        return (
                            <div key={index} onClick={ () => openModal(member.staff_id) }>
                                <TeamMember {...member.staff_id} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <TeamMemberModal ref={openModalRef} activeMember={activeMember} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </ContentSection>
    );
};

const TeamMemberModal = forwardRef(({ activeMember, modalOpen, setModalOpen }, ref) => {
    // const [isOpen, setIsOpen] = useState(false);
    // firstName, lastName, jobTitle, photo, bio
    if(activeMember) {
        var image = activeMember.photo;
        var photoUrl = typeof image === 'object' ? formatImageURL(image) : image;
    
        var name = `${activeMember.firstName} ${activeMember.lastName}`;
        var jobTitle = activeMember.jobTitle;
    
        var bioText = smartquotes(stripHtml(marked.parse(activeMember.bio), {
            ignoreTags: ['p', 'i', 'em', 'b', 'strong']
        }).result);
    }

    const transition = { duration: .5, ease: [.25, .1, .25, 1], delay: .25 };
    const variants = {
        hidden: { filter: "blur(10px)", transform: "translateY(1rem)", opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    };

    const handleClose = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <dialog className="member-bio-modal modal shadow-lg bg-base-content bg-opacity-90" ref={ref}>
            <div className="modal-box bg-white !rounded-none relative p-6 w-full md:w-4/5 max-w-3xl">

                <form method="dialog">
                    <button onClick={handleClose} className="absolute z-10 top-2 right-2 md:top-4 md:right-4 text-lg text-secondary outline-none focus:outline-none p-4">
                        <CloseIcon />
                    </button>

                    {activeMember && (
                        <>
                            <motion.div initial={variants.hidden} animate={modalOpen ? "visible" : "hidden"} variants={variants} transition={transition}
                                className="flex flex-col md:flex-row mt-7 lg:mt-4 p-2 gap-4 md:gap-6 lg:gap-10">
                                    <section className="flex-auto md:w-1/4">
                                        <Image src={photoUrl} alt={`${name}`} width={image.width} height={image.height} className="w-full" />
                                    </section>

                                    <section className="flex-auto md:w-3/4">
                                        <Header element="h3" className="text-secondary text-lgr font-black mt-0 mb-1">{name}</Header>
                                        <p className="text-sm md:text-sm2/6 mt-0 font-bold">{jobTitle}</p>
                                        <div className="bio-text text-sm md:text-sm2/7" dangerouslySetInnerHTML={{ __html: bioText }} />
                                    </section>
                            </motion.div>
                        </>
                    )}
    
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
});

TeamMemberModal.displayName = TeamMemberModal;

const CloseIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" width="1em" viewBox="0 -960 960 960" {...props}>
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    )
}



export const sampleTeamMembers = [
    {
        "__typename": "block_teamMembers_staff",
        "staff_id": {
            "__typename": "staff",
            "id": "2dd47578-388d-40e2-92e1-5d0294583ea5",
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
        }
    },
    {
        "__typename": "block_teamMembers_staff",
        "staff_id": {
            "__typename": "staff",
            "id": "e35c8e1b-0c03-4dbd-8928-098f2db71fc6",
            "firstName": "Nancy",
            "jobTitle": "Executive Director/Head of Finance",
            "lastName": "Caulfield",
            "bio": null,
            "photo": {
                "__typename": "directus_files",
                "id": "99c0d4a1-b5d0-4680-917e-17d7750ee145",
                "filename_disk": "99c0d4a1-b5d0-4680-917e-17d7750ee145.jpg",
                "filename_download": "NancyCaulfield.jpg"
            }
        }
    },
    {
        "__typename": "block_teamMembers_staff",
        "staff_id": {
            "__typename": "staff",
            "id": "265175b8-c39f-4052-ba9e-971b2f97623f",
            "firstName": "Greg",
            "jobTitle": "Executive Director",
            "lastName": "Sprick",
            "bio": null,
            "photo": {
                "__typename": "directus_files",
                "id": "b6133e37-058e-4054-a1fb-1281d3b6b907",
                "filename_disk": "b6133e37-058e-4054-a1fb-1281d3b6b907.jpg",
                "filename_download": "2017_0425_013533.jpg"
            }
        }
    },
    {
        "__typename": "block_teamMembers_staff",
        "staff_id": {
            "__typename": "staff",
            "id": "5fe88903-35d9-4e22-bbaf-0931fdd7bf8b",
            "firstName": "Stephanie",
            "jobTitle": "Head of Creative",
            "lastName": "Stewart",
            "bio": "",
            "photo": {
                "__typename": "directus_files",
                "id": "92f088de-4576-4978-a249-e873d9d607b0",
                "filename_disk": "92f088de-4576-4978-a249-e873d9d607b0.jpg",
                "filename_download": "StephanieStewart_2024.jpg"
            }
        }
    },
    {
        "__typename": "block_teamMembers_staff",
        "staff_id": {
            "__typename": "staff",
            "id": "2dd47578-388d-40e2-92e1-5d0294583ea5",
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
        }
    },
    {
        "__typename": "block_teamMembers_staff",
        "staff_id": {
            "__typename": "staff",
            "id": "e35c8e1b-0c03-4dbd-8928-098f2db71fc6",
            "firstName": "Nancy",
            "jobTitle": "Executive Director/Head of Finance",
            "lastName": "Caulfield",
            "bio": null,
            "photo": {
                "__typename": "directus_files",
                "id": "99c0d4a1-b5d0-4680-917e-17d7750ee145",
                "filename_disk": "99c0d4a1-b5d0-4680-917e-17d7750ee145.jpg",
                "filename_download": "NancyCaulfield.jpg"
            }
        }
    },
    {
        "__typename": "block_teamMembers_staff",
        "staff_id": {
            "__typename": "staff",
            "id": "265175b8-c39f-4052-ba9e-971b2f97623f",
            "firstName": "Greg",
            "jobTitle": "Executive Director",
            "lastName": "Sprick",
            "bio": null,
            "photo": {
                "__typename": "directus_files",
                "id": "b6133e37-058e-4054-a1fb-1281d3b6b907",
                "filename_disk": "b6133e37-058e-4054-a1fb-1281d3b6b907.jpg",
                "filename_download": "2017_0425_013533.jpg"
            }
        }
    },
    {
        "__typename": "block_teamMembers_staff",
        "staff_id": {
            "__typename": "staff",
            "id": "5fe88903-35d9-4e22-bbaf-0931fdd7bf8b",
            "firstName": "Stephanie",
            "jobTitle": "Head of Creative",
            "lastName": "Stewart",
            "bio": "",
            "photo": {
                "__typename": "directus_files",
                "id": "92f088de-4576-4978-a249-e873d9d607b0",
                "filename_disk": "92f088de-4576-4978-a249-e873d9d607b0.jpg",
                "filename_download": "StephanieStewart_2024.jpg"
            }
        }
    }
];