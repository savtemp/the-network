export class Post{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.picture = data.picture
        this.coverImg = data.coverImg
        this.email = data.email
        this.bio = data.bio || ''
        this.github = data.github
        this.linkedin = data.linkedin
        this.resume = data.resume
        this.class = data.class
        this.graduated = data.graduated
    }
}