import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    ProductID: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Currency: { type: String, required: true },
    StockQuantity: { type: Number, required: true },
    Description: { type: String },
    Category: { type: String },
    SubCategory: { type: String },
    Brand: { type: String },
    ModelNumber: { type: String },
    DiscountPrice: { type: Number },
    SKU: { type: String },
    AvailabilityStatus: { type: String },
    Attributes: {
      Color: { type: String },
      Size: { type: String },
      Material: { type: String },
      Dimensions: {
        Width: { type: Number },
        Height: { type: Number },
        Depth: { type: Number },
        Weight: { type: Number }
      }
    },
    Images: [String],
    ThumbnailURL: { type: String },
    Shipping: {
      ShippingWeight: { type: Number },
      ShippingDimensions: {
        Width: { type: Number },
        Height: { type: Number },
        Depth: { type: Number }
      },
      ShippingCost: { type: Number },
      ShippingOptions: [String]
    },
    RatingsAndReviews: {
      AverageRating: { type: Number },
      ReviewCount: { type: Number }
    },
    Tags: [String]
},
{
  timestamps: true,
})

export default mongoose.model('product', productSchema);