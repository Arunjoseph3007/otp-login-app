import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

export default function VerifyOtp() {
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState<string>(
    (router.query.no as string) || ""
  );
  const [otp, setOtp] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const verfiyOtpEndpoint = "http://localhost:8000/auth/verifyOtp";

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await axios.post(verfiyOtpEndpoint, { mobileNo, otp });

      if (res.status == 200) {
        setStatus(res.data.message);
      }
    } catch (error: any) {
      setStatus(error.response.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Verify OTP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="fullscreen dead-center">
        <div className="flex flex-col gap-5 border rounded shadow-md w-11/12 max-w-lg py-8">
          <h1 className="text-3xl font-bold text-center">Enter your OTP</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-9">
            {status && <h3>{status}</h3>}
            <input
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              type="text"
              placeholder="Enter your mobile number.."
              className="input input-bordered focus:invalid:border-red-400"
              pattern="[0-9]{10}"
              title="Enter a valid mobile number"
              required
            />
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter your OTP.."
              className="input input-bordered focus:invalid:border-red-400"
              pattern="[0-9]{6}"
              title="Enter your six digit OTP"
              required
            />
            <button type="submit" className="btn btn-primary">
              verfiy otp
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
