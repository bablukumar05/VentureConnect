const Payment = require('../models/Payment');
const Subscription = require('../models/Subscription');

/**
 * Process Razorpay / Stripe Mock Payment Checkout
 */
const createCheckoutOrder = async (req, res) => {
  try {
    const { amount, purpose, provider = 'razorpay' } = req.body;

    const mockOrderId = `order_${provider}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const payment = await Payment.create({
      user: req.user._id,
      provider,
      transactionId: `txn_${Date.now()}`,
      orderId: mockOrderId,
      amount: amount || 4999,
      purpose: purpose || 'subscription',
      status: 'completed',
    });

    if (purpose === 'subscription') {
      await Subscription.findOneAndUpdate(
        { user: req.user._id },
        {
          user: req.user._id,
          plan: 'pro',
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 Days
          features: ['Unlimited AI Analysis', 'Priority Investor Matching', 'Direct Founder Chat'],
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Payment completed successfully',
      orderId: mockOrderId,
      payment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get user subscription status
 */
const getSubscriptionStatus = async (req, res) => {
  try {
    let sub = await Subscription.findOne({ user: req.user._id });
    if (!sub) {
      sub = await Subscription.create({
        user: req.user._id,
        plan: 'free',
        status: 'active',
        features: ['Basic Matching', 'Pitch Deck Upload'],
      });
    }
    res.status(200).json({ success: true, subscription: sub });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCheckoutOrder,
  getSubscriptionStatus,
};
