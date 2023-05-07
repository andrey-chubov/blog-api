import mongoose, { Schema } from "mongoose";

export interface IToken {
	user: Schema.Types.ObjectId;
	refreshToken: string;
}

export type TokenDocument = IToken & mongoose.Document

const TokenSchema = new mongoose.Schema<TokenDocument>({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	refreshToken: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Tokens", TokenSchema);