const sgMail=require('@sendgrid/mail')


sgMail.setApiKey(process.env.sendGridApiKey)

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'connorc3456@gmail.com',
        subject:'Thanks for joining in! ',
        text:`Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'connorc3456@gmail.com',
        subject:'Cancellation Feedback!',
        text:`Hey ${name}, As you are a valuable customer to us, Please tell us what went bad from our side. And how can we make it better to get you back! `
    })
}
module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}