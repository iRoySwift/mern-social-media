import { Document, Schema, model } from "mongoose";

export interface IScratch extends Document {
  sb3ProjectPath: string;
  title: string;
  intro: string;
  desc: string;
  targets: any[];
  monitors: any[];
  extensions: any[];
  meta: object;
}

const ScratchSchema = new Schema<IScratch>(
  {
    sb3ProjectPath: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    intro: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    targets: {
      type: [Object],
      default: []
    },
    monitors: {
      type: [Object],
      default: []
    },
    extensions: {
      type: [Object],
      default: []
    },
    meta: {
      type: Object,
      default: {}
    }
  },
  {
    minimize: false,
    timestamps: true
  }
);

const Scratch = model<IScratch>("Scratch", ScratchSchema);
export default Scratch;
