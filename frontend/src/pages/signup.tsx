import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const signupEndpoint = "http://localhost:8000/auth/signup";

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await axios.post(signupEndpoint, { mobileNo });

      if (res.status == 200) {
        setStatus("OTP send (Check the console). Redirecting...");
        setTimeout(() => router.push(`/verifyOtp?no=${mobileNo}`), 2000);
      }
    } catch (error: any) {
      setStatus(error.response.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="fullscreen dead-center">
        <div className="flex flex-col gap-5 border rounded shadow-md w-11/12 max-w-lg py-8">
          <h1 className="text-3xl font-bold text-center">
            Enter your mobile number
          </h1>
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
            <button type="submit" className="btn btn-primary">
              generate otp
            </button>
          </form>
        </div>
      </main>
    </>
  );
}