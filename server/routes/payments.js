router.post("/api/payments", async (req, res) => {
    console.log("📥 Received Payment Data:", req.body); // ✅ Debugging log

    try {
        const { productId, productName, userName, userEmail, biddedAmount, address, paymentMethod, cardDetails } = req.body;

        // 🔹 Check for missing fields
        if (!productId || !productName || !userName || !userEmail || !biddedAmount || !address || !paymentMethod || !cardDetails) {
            console.log("⚠️ Missing required fields:", req.body);
            return res.status(400).json({ success: false, message: "⚠️ Missing required fields!" });
        }

        // 🔹 Save to the database
        const newPayment = new Payment({
            productId,
            productName,
            userName,
            userEmail,
            biddedAmount,
            address,
            paymentMethod,
            cardDetails
        });

        await newPayment.save();
        console.log("✅ Payment saved successfully!");
        res.status(201).json({ success: true, message: "✅ Payment recorded!" });

    } catch (error) {
        console.error("❌ Payment Error:", error.message); // ✅ Log backend error details
        res.status(500).json({ success: false, message: "❌ Internal Server Error" });
    }
});
