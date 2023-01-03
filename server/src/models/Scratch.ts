import { Document, Schema, model } from "mongoose";

export interface IScratch extends Document {
  targets: any[]
  monitors: any[]
  extensions: any[]
  meta: object
}

const ScratchSchema = new Schema({
  targets: {
    type: Array,
    default: []
  },
  monitors: {
    type: Array,
    default: []
  },
  extensions: {
    type: Array,
    default: []
  },
  meta: {
    type: Object,
    default: {}
  },
}, {
  minimize: false,
  timestamps: true
})

const Scratch = model<IScratch>("Scratch", ScratchSchema)
export default Scratch;