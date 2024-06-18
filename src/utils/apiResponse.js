class apiResponse {
    constructor(statusode,data,message = "Success")
    {
    this.statuscode = statusode
    this.data = data
    this.message = message
    this.success  = statuscode < 400
    }
    

}