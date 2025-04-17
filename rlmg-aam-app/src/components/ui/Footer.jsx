import React, { useState, useRef, forwardRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Logo } from "./Logo";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { BulletList } from "../typography/BulletList";
import { HiArrowLongRight } from "react-icons/hi2";

export const Footer = ({ logoImg, orgName, email, address, cityStateZip, listItems, socialLinks, className }) => {
    // console.log('socialLinks', socialLinks);

    const [formData, setFormData] = useState({ fname: '', lname: '', email: '' });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const openModalRef = useRef();
    const emailInputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('getname');
        openModalRef.current.showModal();
        const formData = new FormData(e.target);

        setFormData({
            name: formData.get('fname'),
            email: formData.get('email')
        });
    }

    useEffect(() => {
        if (submissionStatus === 'success') {
            emailInputRef.current.value = '';
        }
    }, [submissionStatus]);

    return (
        <footer className={`mt-6 py-4 ${className}`}>
            <section className="section-padded">
                <div className="flex w-full flex-col lg:flex-row items-stretch lg:justify-between gap-4 lg:gap-10">

                    {/* colum one */}
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 xl:gap-12 flex-1">
                        <div className="pl-2 lg:pl-0">
                            <Logo img={logoImg} orgName={orgName} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="my-0 font-extrabold text-lgr md:text-xl lg:text-2xl text-primary">
                                <a href={`mailto:${email}`}>{email}</a>
                            </h3>
                            <p className="my-0 text-sm lg:text-sm2 xl:text-nowrap">{address}, {cityStateZip}</p>
                            <SocialMediaIcons links={socialLinks} className="my-2" size="medium" />
                        </div>
                    </div>

                    {/* column two */}
                    <div className="flex-0 pb-4 lg:pb-0 lg:px-8 xl:px-10 order-3 lg:order-2">
                        <BulletList bullets={false} textSize="small" spacing="looser" listItems={listItems} className={``} columns={2} columnsOnMobile={true} />
                    </div>

                    {/* column three */}
                    <div className="flex flex-col justify-between gap-6 lg:gap-10 flex-1 lg:order-3 xl:px-6">
                        <div className="flex flex-col gap-4 max-w-full">
                            <h3 className="my-0">Subscribe to Our Newsletter</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-row items-center justify-between gap-2 border-b border-base-300 mb-6 lg:mb-4">
                                    <div className="flex-1">
                                        <input ref={emailInputRef} name="email" type="email" placeholder="Enter Email*" className="input input-sm text-base input-ghost p-1 pl-0 h-auto w-full max-w-full" required />
                                    </div>
                                    <button type="submit" className="btn btn-ghost text-right !px-1">
                                        <HiArrowLongRight className="text-primary w-6 h-6" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="lg:self-end hidden lg:block">
                            <p className="text-xs my-0">&copy; 2025 {orgName}</p>
                        </div>
                    </div>

                    <div className="order-4 block mt-6 lg:hidden">
                        <p className="text-xs my-0">&copy; 2025 {orgName}</p>
                    </div>
                </div>
            </section>

            <SubscribeModal ref={openModalRef} submissionStatus={submissionStatus} setSubmissionStatus={setSubmissionStatus} formData={formData} setFormData={setFormData} />
        </footer>
    );
}

export const SubscribeModal = forwardRef(({ submissionStatus, setSubmissionStatus, formData, setFormData }, ref) => {
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);

    const [emailError, setEmailError] = useState(false);
    const [fnameError, setFnameError] = useState(false);
    const [lnameError, setLnameError] = useState(false);

    useEffect(() => {
        firstNameRef.current.focus()
        emailRef.current.value = formData.email;
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');
        const submit = {
            fname: firstNameRef.current.value.trim(),
            lname: lastNameRef.current.value.trim(),
            email: emailRef.current.value.trim(),
        }

        setFormData(submit);

        if (!submit.fname) {
            setFnameError(true);
            setSubmissionStatus('getname');
            return;
        } else {
            setFnameError(false);
        }

        if (!submit.lname) {
            setLnameError(true);
            setSubmissionStatus('getname');
            return;
        } else {
            setLnameError(false);
        }

        if (!submit.email) {
            setEmailError(true);
            setSubmissionStatus('getname');
            return;
        } else {
            setEmailError(false);
        }

        const response = await fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submit),
        });

        const data = await response.json();
        // console.log(data);

        if (data.success) {
            setSubmissionStatus('success');
            emailRef.current.value = '';
            firstNameRef.current.value = '';
            lastNameRef.current.value = '';
        }
        else {
            setSubmissionStatus('error');
        }
    };

    return (
        <dialog className="member-bio-modal modal shadow-lg bg-base-content bg-opacity-90" ref={ref}>
            <div className="modal-box bg-white !rounded-none relative p-6 w-full md:w-4/5 max-w-xl">

                <form method="dialog">
                    <button className="absolute z-10 top-2 right-2 md:top-4 md:right-4 text-lg text-secondary outline-none focus:outline-none p-4">
                        <CloseIcon />
                    </button>

                    {submissionStatus === 'loading' && (

                        <div role="status" className="flex flex-col justify-center items-center w-full h-24 my-4">
                            <p className="text-secondary text-lgr mt-0">Loading…</p>
                            <svg className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-secondary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    )}

                    {submissionStatus === 'success' && (
                        <section className="flex flex-col gap-3 p-2 my-4">
                            <h3 className="text-secondary text-lgr font-black mt-0">Thank You!</h3>
                            <p className="text-sm md:text-sm2/6 m-0">You have been subscribed to our newsletter. We look forward to being in touch!</p>
                            <p className="text-sm md:text-sm2/6 m-0"><em>— The RLMG Team</em></p>
                        </section>
                    )}

                    {submissionStatus === 'error' && (
                        <section className="flex flex-col gap-3 p-2 my-4">
                            <h3 className="text-secondary text-lgr font-black mt-0">Oops!</h3>
                            <p className="text-sm md:text-sm2/6 m-0">Something went wrong. Please try again.</p>
                        </section>
                    )}
                </form>

                <form className={`${submissionStatus === 'getname' ? 'block' : 'hidden'}`}>
                    <section className={`flex flex-col gap-3 p-2 my-4 _mt-6`}>
                        <h3 className="text-secondary text-lgr font-black mt-0">Almost there!</h3>
                        <div className="flex flex-col md:flex-row gap-2">
                            <label className="form-control w-full md:w-1/2">
                                <input ref={firstNameRef} autoFocus type="text" name="fname" placeholder="First name" className={`input ${fnameError ? 'input-error' : ''} input-bordered w-full`} required />
                                <div className="label">
                                    <span className="label-text-alt">First name</span>
                                </div>
                            </label>
                            <label className="form-control w-full md:w-1/2">
                                <input ref={lastNameRef} type="text" name="lname" placeholder="Last name" className={`input ${lnameError ? 'input-error' : ''} input-bordered w-full`} required />
                                <div className="label">
                                    <span className="label-text-alt">Last name</span>
                                </div>
                            </label>
                        </div>
                        <label className="form-control w-full">
                            <input ref={emailRef} type="text" name="email" placeholder="Email" className={`input ${emailError ? 'input-error' : 'input-success'} input-bordered w-full`} required />
                            <div className="label">
                                <span className="label-text-alt">Email</span>
                            </div>
                        </label>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">Subscribe</button>
                    </section>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
});

SubscribeModal.displayName = SubscribeModal;

const CloseIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" width="1em" viewBox="0 -960 960 960" {...props}>
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    )
}

Footer.propTypes = {
    logoImg: PropTypes.string,
    orgName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    listItems: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        url: PropTypes.string,
    })),
    socialLinks: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        url: PropTypes.string,
    })),
    className: PropTypes.string,
}

Footer.defaultProps = {
    logoImg: '',
    orgName: 'RLMG',
    email: 'hello@rlmg.com',
    address: '70 Coolidge Hill Road, Watertown, MA 02472',
    listItems: [
        { text: 'About Us', url: '/about' },
        { text: 'Services', url: '/services' },
        { text: 'Portfolio', url: '/portfolio' },
        { text: 'Contact', url: '/contact' },
    ],
    socialLinks: [
        { platform: 'linkedin', displayText: 'LinkedIn', url: 'https://www.linkedin.com/company/rlmg' },
        { platform: 'facebook', displayText: 'Facebook', url: 'https://www.facebook.com/rlmg' },
        { platform: 'instagram', displayText: 'Instagram', url: 'https://www.instagram.com/rlmg' },
        { platform: 'twitter', displayText: 'Twitter', url: 'https://www.twitter.com/rlmg' },
    ],
    className: '',
}