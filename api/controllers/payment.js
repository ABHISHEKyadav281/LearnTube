
import Razorpay from 'razorpay';
import crypto from 'crypto';

export const payorder= async function (req, res, next) {
    try {
        console.log("hii");
        const instance = new Razorpay({
            key_id: "rzp_test_r6EJwrxJbscSV9",
            key_secret: "A0ETOcXCfUXgupemi1uCptXr",
        });
        const options = {
            amount: 12900,  // amount in the smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err,"hiii");
                return res.status(500).json({ message: "something went worng" })
            }
            res.json({ data: order });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went worng" })
    }
};

export const payverify=(req,res)=>{

    try {
        console.log(req.body)
        const{
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        }=req.body;
        const sign=razorpay_order_id +"|"+razorpay_payment_id
        const expectedSign=crypto.createHmac("sha256","A0ETOcXCfUXgupemi1uCptXr").update(sign.toString()).digest("hex");
        console.log(razorpay_signature)
        console.log(expectedSign)
        if(razorpay_signature===expectedSign){
            console.log("done first");
            return res.json({message:"payment verified succesfully"})
        }
        else{
            console.log(" not done first");
            return res.json({message:"invalid signature "})

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went worng" })
    }

    
     };
