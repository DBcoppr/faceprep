import axios from "axios"


export const getData=async(page)=>{
    try {
        const {data}=await axios.get(`https://randomuser.me/api/?page=${page}&results=300&inc=name,picture&nat=us,dk,fr,gb&seed=contactinfo`)
        
        //change in result obj for fullname and thumbnail pic
        let user=data.results
        let fullname = ""
        let picture = ""
        user.map((item)=>{
            fullname=""
            fullname=item.name.first+" "+ item.name.last
            item.fullname=fullname
            picture=item.picture.thumbnail
            item.picture=picture
            delete item.name
        })

        // sort by username
        user.sort(function (a, b) {
            if (a.fullname < b.fullname) {
              return -1;
            }
            if (a.fullname > b.fullname) {
              return 1;
            }
            return 0;
          });
        return user
    } catch (error)
    {
        return error
    }
}