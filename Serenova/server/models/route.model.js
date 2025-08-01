const mongoose = require("mongoose");

const routeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentLocation: {
      type: [Number],
      required: true,
      validator: function (arr) {
        return arr.length === 2;
      },
    },
    destinationLocation: {
      type: [Number],
      required: true,
      validator: function (arr) {
        return arr.length === 2;
      },
    },
    currentLocationName: {
      type: String,
      required: true,
    },
    destinationLocationName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Route", routeSchema);
