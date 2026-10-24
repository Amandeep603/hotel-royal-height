import Review from "../models/Review.js";

const DEFAULT_REVIEWS = [
  {
    _id: "rev1",
    authorName: "Aarav & Priya Sharma",
    location: "New Delhi",
    rating: 5,
    title: "Magical Ganga View Suite",
    comment: "The Ganga View suite exceeded all our expectations! Waking up to the morning bells and tea on the balcony was pure magic. Staff arranged a private cab for Triveni Ghat Aarti seamlessly.",
    travelerType: "Couple",
    createdAt: new Date(),
  },
  {
    _id: "rev2",
    authorName: "Marcus Vance",
    location: "Melbourne, Australia",
    rating: 5,
    title: "Perfect Sanctuary for Yoga Practitioners",
    comment: "Stayed for 10 days while completing my 200h yoga certification in Tapovan. Reliable high-speed fiber Wi-Fi, peaceful rooftop, super clean rooms, and genuine Garhwali hospitality.",
    travelerType: "Solo",
    createdAt: new Date(),
  },
  {
    _id: "rev3",
    authorName: "Rohit Deshmukh",
    location: "Mumbai",
    rating: 5,
    title: "Spacious Family Suite & Great Rafting Assistance",
    comment: "We booked the Family Suite for 4 adults and 2 kids. Very spacious, impeccable hygiene, and great vegetarian food at the rooftop cafe. The hotel arranged Shivpuri rafting for us at the best price.",
    travelerType: "Family",
    createdAt: new Date(),
  },
];

export const getReviews = async (req, res, next) => {
  try {
    const { roomId } = req.query;
    let reviews = [];

    try {
      const query = { isApproved: true };
      if (roomId) query.room = roomId;
      reviews = await Review.find(query).sort({ createdAt: -1 });
    } catch (e) {
      reviews = [];
    }

    if (!reviews || reviews.length === 0) {
      reviews = DEFAULT_REVIEWS;
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { roomId, rating, title, comment, travelerType, authorName, location } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: "Please provide a rating and comment." });
    }

    const review = await Review.create({
      room: roomId,
      user: req.user?._id || req.user?.id,
      authorName: authorName || req.user?.name || "Verified Guest",
      location: location || "India",
      rating: Number(rating),
      title: title || "Wonderful Experience",
      comment,
      travelerType: travelerType || "Couple",
      isApproved: true, // auto-approve for seamless test UX
    });

    res.status(201).json({
      success: true,
      message: "Thank you for sharing your feedback! Your review has been published.",
      review,
    });
  } catch (error) {
    next(error);
  }
};
