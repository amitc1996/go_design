import axios from "axios";

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


export const rechargeWallet = async ({ amount, userId , onCheckoutOpen}) => {
  try {
    const res = await axios.post("http://localhost:5000/api/wallet/recharge", {
      amount,
      userId,
    });

    const { success, order } = res.data;
    if (!success) {
      throw new Error("Failed to create order");
    }

    const loaded = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!loaded) {
      throw new Error("Failed to load Razorpay SDK");
    }

    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_R9WNEHG3V1bTm1",
        currency: order.currency,
        name: "My Wallet",
        description: "Wallet Recharge",
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post("http://localhost:5000/api/wallet/verify", {
              orderId: order.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: order.amount / 100,
              userId,
            });
            resolve(response);
          } catch (err) {
            reject(new Error("Payment verification failed"));
          }
        },
        prefill: {
          name: "Amit Choudhary",
          email: "amit@yopmail.com",
        },
        theme: {
          color: "#5E83FF",
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment cancelled by user"));
          },
        },
      };

      const rzp = new window.Razorpay(options);

      if (typeof onCheckoutOpen === "function") {
        onCheckoutOpen();
      }

      rzp.open();
    });
  } catch (error) {
    console.error("Recharge failed:", error);
    throw error;
  }
};
