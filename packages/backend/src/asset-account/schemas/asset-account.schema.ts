import * as mongoose from 'mongoose';
    
export const AssetAccountSchema = new mongoose.Schema({
    name: {
        th: String,
        en: String,
    },
    is_fixed_asset: Boolean,
    is_tangible_asset: Boolean,
    date_created: String,
});