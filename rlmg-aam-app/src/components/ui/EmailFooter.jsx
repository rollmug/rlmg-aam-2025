'use client'

import React, { useState, useEffect, useRef } from 'react';
import copy from 'copy-to-clipboard';
import { Button } from './Button';
// import Link from 'next/link';

export const EmailFooter = ({ name, title, pronouns, officeNum, mobileNum }) => {
  const signatureBlock = useRef();

  const [emailSignature, setEmailSignature] = useState('');
  const [signatureCopied, setSignatureCopied] = useState(false);
  const [signatureError, setSignatureError] = useState(false);

  useEffect(() => {
    const emailSignature = document.querySelector('.email-signature');
    const headerTemplate = HeaderTemplate;
    const footerTemplate = FooterTemplate;

    if (emailSignature) {
      emailSignature.innerHTML = `${headerTemplate} ${NameBlock({ name })} ${TitleBlock({ title, pronouns })} ${OfficeNum({ officeNum })} ${MobileNum({ mobileNum })} ${footerTemplate}`; // ${SocialIcons({ officeNum, mobileNum })}
    }
  }, [name, title, pronouns, officeNum, mobileNum]);

  const handleCopySignature = async () => {
    if (signatureBlock.current) {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob(
          [signatureBlock.current.innerText],
          { type: "text/plain" }
        ),
        "text/html": new Blob(
          [signatureBlock.current.outerHTML],
          { type: "text/html" }
        ),
      });

      await navigator.clipboard.write([clipboardItem]);
      setSignatureCopied(true);
      setSignatureError(false);
      console.log('Signature copied to clipboard!');
    } else {
      setSignatureError(true);
      setSignatureCopied(false);
      console.error('Signature block not found!');
    }
  }

  const handleCopyHtml = () => {
    if (signatureBlock.current) {
      copy(signatureBlock.current.innerHTML);
      console.log('Signature copied to clipboard!');
    }
  }

  return (
    <>
      <div className="badge badge-accent text-xs mb-4"><span className='text-orange-500 pr-1'>☀</span> Updated April 9, 2025 at 3:00 pm</div>
      <p className="text-base mt-0">Use the form controls at the bottom of this page to create your email signature for Gmail.</p>
      <p className='text-sm'>
        Enter your full name, your job title, and optionally, your pronouns and phone numbers.
        The email signature will be generated below.
        When you’re ready, click the “Copy Signature” button to copy the signature to your clipboard. Then, paste it into your Gmail signature settings.
      </p>

      <p className='text-sm font-bold'>
        Signature Preview:
      </p>

      <hr className='my-5 w-full border-t-2' />

      <div className='w-full'>
        <div className='email-signature' ref={signatureBlock}></div>
      </div>

      <div>
        {/* <hr className=' opacity-0 my-5 w-full border-t-2 mt-6' /> */}
        <hr className='mb-5 -mt-4 w-full border-t-2' />
        <span onClick={handleCopySignature}><Button label="Copy Signature" type="button" /> </span>
        <span className='btn btn-link !text-xs !font-normal' onClick={handleCopyHtml}>Copy HTML</span>
      </div>

      {signatureCopied && (
        <>
          <p className=" text-base">Signature copied to clipboard. Now you can paste it into your Gmail signature.</p>
          <ul>
            <li className='text-sm'>Open the gear icon at the top of your Gmail, and click "See all settings"</li>
            <li className='text-sm'>Scroll down to your signature settings and paste your signature (copied above) into the signature (replacing the old one, if you had one).</li>
          </ul>
        </>
      )}
      {signatureError && <p style={{ color: "red" }}>Error copying signature!</p>}
    </>
  );
};




// Helper functions to create the HTML blocks for the email signature

const HeaderTemplate = `<br />
<div>
  <a href="https://rlmg.com" target="_blank">
      <img
        alt
        src="https://manage.rlmg.com/assets/fc96f888-8461-48bb-9508-16b6c93d6955/rlmg-email-logo.png"
        width="90"
        height="45"
        style="width:90px; height: 45px;"
      />
    </a>`;

const NameBlock = ({ name }) => {
  return `<div
      style="
        font-family: 'arial black', Arial, 'Helvetica Neue', Helvetica, sans-serif;
        font-size: 15px;
        font-weight: bold;
        line-height: 1.5;
        text-align: left;
        color: #015a8d !important;
        margin-top: 17px;
      "
    >
    ${name}
    </div>`;
}

// const NameBlock = ({ name }) => {
//   return `<tr>
//     <td align="left" style="font-size: 0px;padding: 10px 0 0;word-break: break-word;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//       <div style="font-family:'arial black', Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:20px;font-weight:bold;line-height:1.5;text-align:left;color:#015a8d;">${name}</div>
//     </td>
//   </tr>`;
// }

const TitleBlock = ({ title, pronouns }) => {
  return `<div
      style="
        font-family: Georgia, Times, 'Times New Roman', serif;
        font-size: 12px;
        line-height: 1.5;
        text-align: left;
        color: #000000 !important;
      "
    >
      ${title} ${pronouns && pronouns.length > 0 ? `&nbsp;|&nbsp; <em>${pronouns}</em>` : ''}
    </div>`;
}

// const TitleBlock = ({ title, pronouns }) => {
//   return `<tr>
//     <td align="left" style="font-size: 0px;padding: 0 0 16px;word-break: break-word;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//       <div style="font-family:Georgia,Times,'Times New Roman',serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
//           ${title}
//           ${pronouns && pronouns.length > 0 ? `&nbsp;|&nbsp;<em>${pronouns}</em>` : ''}
//       </div>
//     </td>
//   </tr>`;
// }

const OfficeNum = ({ officeNum }) => {
  if (officeNum === undefined || officeNum.length === 0) {
    return '';
  }

  return `<div
      style="
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        text-align: left;
        color: #000000 !important;
        margin-top: 12px;
      "
    >
      Office: ${officeNum}
    </div>`;

  // return `<tr>
  //   <td align="left" style="font-size: 0px;padding: 0;word-break: break-word;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
  //     <div style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;">Office: ${officeNum}</div>
  //   </td>
  // </tr>`;
}

const MobileNum = ({ mobileNum }) => {
  if (mobileNum === undefined || mobileNum.length === 0) {
    return '';
  }
  return `<div
      style="
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        text-align: left;
        color: #000000 !important;
      "
    >
      Mobile: ${mobileNum}
    </div>`;

  // return `<tr>
  //   <td align="left" style="font-size: 0px;padding: 0;word-break: break-word;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
  //     <div style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;">Mobile: ${mobileNum}</div>
  //   </td>
  // </tr>`;
}

// const HeaderTemplateOld = `<div style="width:100%;max-width:100%"><table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;background: #ffffff;background-color: #ffffff;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//       <tbody>
//         <tr>
//           <td style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//             <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
//             <div style="margin:0px; width: 100% !important">
//               <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                 <tbody>
//                   <tr>
//                     <td style="direction: ltr;font-size: 0px;padding: 10px 0;text-align: center;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                       <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
//                       <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100% !important; max-width: 100%;">
//                         <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                           <tbody>
//                             <tr>
//                               <td style="vertical-align: top;padding: 0px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="100%">
//                                   <tbody>
//                                     <tr>
//                                       <td align="left" style="font-size: 0px;padding: 10px 0 16px;word-break: break-word;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                                         <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;border-spacing: 0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                                           <tbody>
//                                             <tr>
//                                               <td style="width: 100px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                                                 <a href="https://rlmg.com" target="_blank">
//                                                   <img alt src="https://manage.rlmg.com/assets/fc96f888-8461-48bb-9508-16b6c93d6955/rlmg-email-logo.png" style="border: 0;display: block;outline: none;text-decoration: none;height: auto;width: 100%;font-size: 13px;line-height: 100%;-ms-interpolation-mode: bicubic;" width="100" height="auto">
//                                                 </a>
//                                               </td>
//                                             </tr>
//                                           </tbody>
//                                         </table>
//                                       </td>
//                                     </tr>
//                                     <!-- End Header HTML -->`;


const SocialIcons = ({ officeNum, mobileNum }) => {
  const padding = officeNum?.length > 0 || mobileNum?.length > 0 ? 20 : 20;

  return `<div style="margin: ${padding}px 0">
      <a
        href="https://www.instagram.com/rlmg_media/"
        style="
          text-decoration: none !important;
          display: inline-block;
          padding: 0;
          width: 20px;
          height: 20px;
        "
        target="_blank"
      >
        <img
          alt="Instagram Logo"
          height="20"
          src="https://manage.rlmg.com/assets/c6685262-7fbd-4822-9c04-eec1ae39330c/instagram.png"
          style="
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          "
          width="20"
        />
      </a>
    
      <a
        href="https://www.facebook.com/RLMGMedia/"
        style="
          text-decoration: none !important;
          display: inline-block;
          padding: 0;
          width: 20px;
          height: 20px;
        "
        target="_blank"
      >
        <img
          alt=""
          height="20"
          src="https://manage.rlmg.com/assets/4eb2a8ec-8e93-41e5-8f08-020833980f67/facebook.png"
          style="
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          "
          width="20"
        />
      </a>
    
      <a
        href="https://www.linkedin.com/company/richard-lewis-media-group"
        target="_blank"
        style="
          text-decoration: none !important;
          display: inline-block;
          padding: 0;
          width: 20px;
          height: 20px;
        "
      >
        <img
          alt=""
          height="20"
          src="https://manage.rlmg.com/assets/a519d317-51ba-4519-af75-23aefb2de7fc/linkedin.png"
          style="
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          "
          width="20"
        />
      </a>
    </div>`;
}

// const SocialIconsOld = ({ officeNum, mobileNum }) => {
//   const padding = officeNum?.length > 0 || mobileNum?.length > 0 ? 20 : 0;
//   return `<tr>
//     <td align="left" style="font-size: 0px;padding:${padding}px 0 0;word-break: break-word;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//       <!--[if mso | IE]><table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
//       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none;display: inline-table;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//         <tbody>
//           <tr>
//             <td style="padding: 0 10px 0 0;vertical-align: middle;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//               <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px;width: 20px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                 <tbody>
//                   <tr>
//                     <td style="font-size: 0;height: 20px;vertical-align: middle;width: 20px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                       <a href="https://www.instagram.com/rlmg_media/" target="_blank">
//                         <img alt height="20" src="https://manage.rlmg.com/assets/c6685262-7fbd-4822-9c04-eec1ae39330c/instagram.png" style="border-radius: 3px;display: block;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" width="20">
//                       </a>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <!--[if mso | IE]></td><td><![endif]-->
//       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none;display: inline-table;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//         <tbody>
//           <tr>
//             <td style="padding: 0 10px 0 0;vertical-align: middle;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//               <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px;width: 20px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                 <tbody>
//                   <tr>
//                     <td style="font-size: 0;height: 20px;vertical-align: middle;width: 20px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                       <a href="https://www.facebook.com/RLMGMedia/" target="_blank">
//                         <img alt height="20" src="https://manage.rlmg.com/assets/4eb2a8ec-8e93-41e5-8f08-020833980f67/facebook.png" style="border-radius: 3px;display: block;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" width="20">
//                       </a>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <!--[if mso | IE]></td><td><![endif]-->
//       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none;display: inline-table;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//         <tbody>
//           <tr>
//             <td style="padding: 0 10px 0 0;vertical-align: middle;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//               <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px;width: 20px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                 <tbody>
//                   <tr>
//                     <td style="font-size: 0;height: 20px;vertical-align: middle;width: 20px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//                       <a href="https://www.linkedin.com/company/richard-lewis-media-group" target="_blank">
//                         <img alt height="20" src="https://manage.rlmg.com/assets/a519d317-51ba-4519-af75-23aefb2de7fc/linkedin.png" style="border-radius: 3px;display: block;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" width="20">
//                       </a>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <!--[if mso | IE]></td></tr></table><![endif]-->
//     </td>
//   </tr>

//   <!-- Web Address -->
//   <tr>
//     <td align="left" class="website" style="font-size: 0px;padding: 20px 0 0;word-break: break-word;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
//       <div style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:13px;font-weight:bold;line-height:1;text-align:left;color:#019ff9;"><a href="https://rlmg.com" style="color: #019ff9; text-decoration:underline">rlmg.com</a></div>
//     </td>
//   </tr>`

// }

const FooterTemplate = `<div
      style="
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        font-size: 13px;
        font-weight: bold;
        line-height: 1;
        text-align: left;
        color: #019ff9;
        margin-top: 14px;
      "
    >
      <a href="https://rlmg.com" style="color: #019ff9; text-decoration: underline"
        >rlmg.com</a
      >
    </div></div><br /><br />`;

// const FooterTemplate = `
//                                   <!-- Begin Footer HTML -->
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                       <!--[if mso | IE]></td></tr></table><![endif]-->
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <!--[if mso | IE]></td></tr></table><![endif]-->
//           </td>
//         </tr>
//       </tbody>
//     </table></div><br /><br />`;



{/* <div className='hidden'>
        <p>
          <a href="https://rlmg.com" style={{ textDecoration: "none!important" }}>
            <img
              src="https://manage.rlmg.com/assets/fc96f888-8461-48bb-9508-16b6c93d6955/rlmg-email-logo.png"
              width="100"
              height="50"
            />
          </a>
        </p>
        <p style={{
          fontFamily: "'arial black', Arial,'Helvetica Neue',Helvetica,sans-serif",
          color: "#015a8d",
          fontWeight: "bold",
          fontSize: "20px",
          margin: ".25em 0 0",
          lineHeight: "1.5"
        }}
        >{name}</p>
        <p style={{ margin: "0 0 1em", fontSize: "14px", fontFamily: "Georgia,Times,'Times New Roman',serif", lineHeight: "1.5" }}>
          {title}
          {pronouns && (
            <span>
              &nbsp;|&nbsp;<em>{pronouns}</em>
            </span>
          )}
        </p>
        {officeNum && (
          <p style={{ fontFamily: "Arial,'Helvetica Neue',Helvetica,sans-serif", fontSize: "13px", margin: "1em 0 0", lineHeight: "1.5" }}>
            Office: {officeNum}
          </p>
        )}
        {mobileNum && (
          <p style={{ fontFamily: "Arial,'Helvetica Neue',Helvetica,sans-serif", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>
            Mobile: {mobileNum}
          </p>
        )}
        <p style={{ lineHeight: "1em", margin: "1em 0 .5em" }}>
          <a href="https://www.instagram.com/rlmg_media/" style={{ textDecoration: "none!important" }}>
            <img
              src="https://manage.rlmg.com/assets/c6685262-7fbd-4822-9c04-eec1ae39330c/instagram.png"
              width="20" height="20"
              style={{ display: "inline-block", marginRight: "10px", width: "20px", height: "20px" }} />
          </a>
          <a href="https://www.facebook.com/RLMGMedia/" style={{ textDecoration: "none!important" }}>
            <img
              src="https://manage.rlmg.com/assets/4eb2a8ec-8e93-41e5-8f08-020833980f67/facebook.png"
              width="20" height="20"
              style={{ display: "inline-block", marginRight: "10px", width: "20px", height: "20px" }} />
          </a>
          <a href="https://www.linkedin.com/company/richard-lewis-media-group" style={{ textDecoration: "none!important" }}>
            <img
              src="https://manage.rlmg.com/assets/a519d317-51ba-4519-af75-23aefb2de7fc/linkedin.png"
              width="20" height="20"
              style={{ display: "inline-block", marginRight: "10px", width: "20px", height: "20px" }} />
          </a>
        </p>
        <p style={{ lineHeight: "1em", margin: "1em 0 .5em" }}>
          <a href="https://rlmg.com" style={{ fontFamily: "Arial,'Helvetica Neue',Helvetica,sans-serif", textDecoration: "underline", color: "#019ff9", fontWeight: "bold", fontSize: "13px", margin: 0, lineHeight: "1.25" }}>
            rlmg.com
          </a>
        </p>
      </div> */}