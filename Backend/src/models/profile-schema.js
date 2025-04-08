
const profileSchema = {
    about : {String},
    name : {String},
    avatarImage :{ String},
    SocialMediaURL :{ String},
    backgroundImage :{ String},
    successMessage :{ String},
    timestamp : { type: Date, default: Date.now },
}

export default profileSchema ;