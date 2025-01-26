import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import Logo from "../images/logo.png";

const Landing: React.FC = () => {
  return (
    <div className="h-screen">
      {/* Logo and Title Section */}
      <div className="flex">
        <img
          src={Logo}
          className="w-[55.6px] h-[109.7px] mt-[25.98px] ml-[33.9px]"
          alt="Second Chance 4 Pets Logo"
        />
        <h1 className="w-[160.64px] h-[78px] mt-[48.4px] ml-[15px] font-[Inter] text-[24px] font-bold leading-[28.73px] text-left text-[#5E3593]">
          2nd Chance For Pets
        </h1>
      </div>

      {/* Main Content */}
      <div className="mt-16 flex flex-col items-center">
        <h1 className="font-[Inter] font-extrabold text-[40px] leading-[48.41px] mb-6 text-[#5E3593]">
          Welcome
        </h1>
        <p className="font-[Inter] text-[24px] text-gray-600 mb-12 text-center max-w-[600px]">
          We're here to help ensure your pets are taken care of. How would you
          like to proceed?
        </p>

        <div className="flex flex-col gap-6 w-[450px]">
          {/* Existing User Login */}
          <div className="bg-white p-6 rounded-[20px] border-2 border-[#AF94D3] shadow-md">
            <h2 className="font-[Inter] text-[24px] font-bold text-[#5E3593] mb-4 text-center">
              Returning User?
            </h2>
            <Link to="/login" className="w-full">
              <Button className="w-full h-[56px] bg-[#A377DC] text-white rounded-[15px] font-[Inter] font-semibold text-[20px]">
                Login to Your Account
              </Button>
            </Link>
          </div>

          {/* New User Options */}
          <div className="bg-white p-6 rounded-[20px] border-2 border-[#AF94D3] shadow-md">
            <h2 className="font-[Inter] text-[24px] font-bold text-[#5E3593] mb-4 text-center">
              New User?
            </h2>
            <div className="flex flex-col gap-4">
              <Link to="/initialForm" className="w-full">
                <Button className="w-full h-[56px] bg-[#A377DC] text-white rounded-[15px] font-[Inter] font-semibold text-[20px]">
                  Fill Form Online
                </Button>
              </Link>
              <Button
                onClick={() => (window.location.href = "/form.pdf")}
                className="w-full h-[56px] bg-white border-2 border-[#AF94D3] text-[#5E3593] rounded-[15px] font-[Inter] font-semibold text-[20px]"
              >
                Download Blank Form
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-8 font-[Inter] text-[18px] font-semibold">
          Need help?{" "}
          <a href="tel:+1234567890" className="text-[#5F17BE] underline">
            Call us at (123) 456-7890
          </a>
        </p>
      </div>
    </div>
  );
};

export default Landing;
