import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginateV2 from "mongoose-aggregate-paginate-v2";

const vedioSchema = new Schema(
    {
            vedioFile:{
                type:String,
                required:true
            },
            thumbnaul: {
                type: String,
                required: true
            },
            tile:{
                type:String,
                required:true
            },
            description :{
                type:String,
                required:true
            },
            duration :{
                type :Number,
                required:true
            },
            views :{
                type:Number,
                default:0
            },
            isPublished: {
                type: Boolean,
                default: false
            },
            owner: {
              type: Schema.Types.ObjectId,
              ref: "User"
            }
        
    },
    {
        timestamps: true
    }
)

vedioSchema.plugin(mongooseAggregatePaginate) 

export const Video = mongoose.model("Viedeo",vedioSchema)