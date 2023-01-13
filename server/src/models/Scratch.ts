import { Document, Schema, model } from "mongoose";

export interface IScratch extends Document {
  title: string;
  intro: string;
  desc: string;
  targets: any[]
  monitors: any[]
  extensions: any[]
  meta: object
}

const ScratchSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  intro: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
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