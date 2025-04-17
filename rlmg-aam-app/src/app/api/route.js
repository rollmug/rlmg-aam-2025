import mailchimp from '@mailchimp/mailchimp_marketing';
import validate from 'deep-email-validator';
import md5 from 'js-md5';

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
});

export async function POST(req) {
    try {
        const data = await req.json();
        const email = data.email;

        if (!email) {
            return Response.json({ error: 'Email is required' });
        }

        let res = await validate({
            email: email,
            sender: email,
            validateRegex: true,
            validateMx: true,
            validateTypo: true,
            validateDisposable: true,
            validateSMTP: false,
        });

        console.log('res', res);

        if (res.valid) {
            const response = await mailchimp.lists.setListMember(
                process.env.MAILCHIMP_AUDIENCE_ID,
                md5(email.toLowerCase()),
                {
                    email_address: email,
                    status_if_new: "subscribed",
                    merge_fields: {
                        FNAME: data.fname.trim(),
                        LNAME: data.lname.trim()
                    }
                }
            );

            if (response.email_address && response.status === 'subscribed') {
                return Response.json({ success: 'Email added' });
            } else {
                return Response.json({ error: 'Email not added' });
            }
        } else {
            const errorBody = { error: 'Invalid Email', result: res };
            return Response.json(errorBody);
        }
    } catch (error) {
        const errorBody = { error: error.message };
        return Response.json(errorBody);
    }
}